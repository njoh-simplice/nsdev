#!/usr/bin/env node
/**
 * fetch_gsc_ranks.mjs
 *
 * Queries the Google Search Console Search Analytics API for every keyword
 * tracked in data/seo/watchwords.json and either:
 *
 *   --mode append (default)  Adds ONE new dated entry per keyword to
 *                            rank-history.json for a single day's data,
 *                            then exits. Never overwrites or edits an
 *                            existing entry — read-modify-append only.
 *
 *   --mode review --days N   Computes an N-day rolling average per keyword
 *                            (used for the Step 2 seven-day cooldown review)
 *                            and prints it as JSON to stdout. Writes nothing.
 *
 * Required environment variables:
 *   GOOGLE_SERVICE_ACCOUNT_KEY   Full JSON key content as a string (preferred
 *                                for CI/GitHub Actions secrets), OR
 *   GOOGLE_APPLICATION_CREDENTIALS  Path to a JSON key file on disk.
 *   GSC_SITE_URL                 The exact Search Console property, e.g.
 *                                 "https://nsdev.me/" or "sc-domain:nsdev.me"
 *
 * Optional:
 *   SEO_MIN_IMPRESSIONS          Minimum impressions to trust a measurement.
 *                                 Defaults to 10 (see manual guide, Step 1 Fix).
 *   GSC_LAG_DAYS                 Days to look back for the most recent data
 *                                 GSC has actually finished processing.
 *                                 Defaults to 3.
 *
 * This script never scrapes Google search results directly — it only calls
 * the official Search Console API. That guardrail lives in the fact that no
 * other data source is implemented here, not as a comment to remember.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { google } from 'googleapis';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Repo root is four levels up from .claude/skills/seo-rank-watch/scripts/
const REPO_ROOT = path.resolve(__dirname, '../../../../');
const WATCHWORDS_PATH = path.join(REPO_ROOT, 'data/seo/watchwords.json');
const RANK_HISTORY_PATH = path.join(REPO_ROOT, 'data/seo/rank-history.json');

const MIN_IMPRESSIONS = Number(process.env.SEO_MIN_IMPRESSIONS ?? 10);
const GSC_LAG_DAYS = Number(process.env.GSC_LAG_DAYS ?? 3);
const SITE_URL = process.env.GSC_SITE_URL;

const MAX_RETRIES = 5;
const BASE_BACKOFF_MS = 2000;

function parseArgs(argv) {
  const args = { mode: 'append', days: 1 };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--mode') args.mode = argv[++i];
    else if (argv[i] === '--days') args.days = Number(argv[++i]);
    else if (argv[i] === '--date') args.date = argv[++i];
  }
  return args;
}

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function dateRangeEndingAtLag(days) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - GSC_LAG_DAYS);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return { startDate: isoDate(start), endDate: isoDate(end) };
}

async function loadJson(filePath, fallback) {
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return fallback;
    throw new Error(`Failed to read/parse ${filePath}: ${err.message}`);
  }
}

async function getAuthedClient() {
  let credentials;
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const raw = await readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf-8');
    credentials = JSON.parse(raw);
  } else {
    throw new Error(
      'No credentials found. Set GOOGLE_SERVICE_ACCOUNT_KEY (JSON string) or ' +
      'GOOGLE_APPLICATION_CREDENTIALS (path to key file).'
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  return google.searchconsole({ version: 'v1', auth });
}

function isRetryable(err) {
  const code = err?.code ?? err?.response?.status;
  return code === 429 || code === 403 || code === 500 || code === 503;
}

async function withRetry(fn, label) {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt > MAX_RETRIES || !isRetryable(err)) {
        throw new Error(`${label} failed after ${attempt} attempt(s): ${err.message}`);
      }
      const retryAfterHeader = err?.response?.headers?.['retry-after'];
      const waitMs = retryAfterHeader
        ? Number(retryAfterHeader) * 1000
        : BASE_BACKOFF_MS * 2 ** (attempt - 1);
      console.error(
        `[fetch_gsc_ranks] ${label}: retryable error (attempt ${attempt}/${MAX_RETRIES}), ` +
        `waiting ${waitMs}ms — ${err.message}`
      );
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }
}

async function queryKeyword(searchconsole, keyword, targetPath, startDate, endDate) {
  const requestBody = {
    startDate,
    endDate,
    dimensions: ['query', 'page'],
    dimensionFilterGroups: [
      {
        filters: [
          { dimension: 'query', operator: 'equals', expression: keyword },
          ...(targetPath
            ? [{ dimension: 'page', operator: 'contains', expression: targetPath }]
            : []),
        ],
      },
    ],
    rowLimit: 1,
  };

  const res = await withRetry(
    () => searchconsole.searchanalytics.query({ siteUrl: SITE_URL, requestBody }),
    `query "${keyword}"`
  );

  const row = res.data.rows?.[0];
  if (!row) {
    return { avgPosition: null, impressions: 0, clicks: 0 };
  }
  return {
    avgPosition: Math.round(row.position * 100) / 100,
    impressions: row.impressions,
    clicks: row.clicks,
  };
}

async function runAppend(searchconsole, watchwords) {
  const { startDate } = parseArgsDate();
  const date = startDate; // append mode queries a single day
  const existing = await loadJson(RANK_HISTORY_PATH, []);

  const results = [];
  for (const { keyword, targetPath } of watchwords) {
    const alreadyLogged = existing.some(
      (e) => e.keyword === keyword && e.date === date
    );
    if (alreadyLogged) {
      console.error(`[fetch_gsc_ranks] Skipping "${keyword}" — already logged for ${date}.`);
      continue;
    }

    const metrics = await queryKeyword(searchconsole, keyword, targetPath, date, date);
    const entry = { keyword, date, ...metrics };

    if (metrics.impressions < MIN_IMPRESSIONS) {
      entry.lowConfidence = true;
      entry.note = `Below minimum impression threshold (${MIN_IMPRESSIONS}); treat as noise, not signal.`;
    }

    results.push(entry);
  }

  const updated = [...existing, ...results];
  await writeFile(RANK_HISTORY_PATH, JSON.stringify(updated, null, 2) + '\n', 'utf-8');

  console.log(JSON.stringify({ mode: 'append', date, written: results.length, entries: results }, null, 2));
}

async function runReview(searchconsole, watchwords, days) {
  const { startDate, endDate } = dateRangeEndingAtLag(days);
  const results = [];

  for (const { keyword, targetPath } of watchwords) {
    const metrics = await queryKeyword(searchconsole, keyword, targetPath, startDate, endDate);
    results.push({
      keyword,
      windowDays: days,
      startDate,
      endDate,
      ...metrics,
      confidence: metrics.impressions >= MIN_IMPRESSIONS ? 'trusted' : 'low — below min impressions',
    });
  }

  // Review mode never writes to rank-history.json.
  console.log(JSON.stringify({ mode: 'review', windowDays: days, startDate, endDate, results }, null, 2));
}

function parseArgsDate() {
  const args = parseArgs(process.argv.slice(2));
  if (args.date) return { startDate: args.date, endDate: args.date };
  return dateRangeEndingAtLag(1);
}

async function main() {
  if (!SITE_URL) {
    throw new Error('GSC_SITE_URL environment variable is required.');
  }

  const args = parseArgs(process.argv.slice(2));
  const watchwords = await loadJson(WATCHWORDS_PATH, []);
  if (watchwords.length === 0) {
    console.error('[fetch_gsc_ranks] watchwords.json is empty — nothing to query.');
    return;
  }

  const searchconsole = await getAuthedClient();

  if (args.mode === 'review') {
    await runReview(searchconsole, watchwords, args.days ?? 7);
  } else {
    await runAppend(searchconsole, watchwords);
  }
}

main().catch((err) => {
  console.error(`[fetch_gsc_ranks] Fatal: ${err.message}`);
  process.exit(1);
});
