---
name: seo-rank-watch
description: Run the daily SEO Rank Watch cycle — measure keyword rankings via Google Search Console, review any keyword whose 7-day cooldown just ended, pick exactly one keyword to work on, propose one change as a pull request (or a content brief for a keyword with no existing page), log it, and stop. Use this skill only when explicitly asked to run the SEO Rank Watch cycle, e.g. "run seo-rank-watch" or from the scheduled workflow.
---

# SEO Rank Watch

You are running one cycle of a keyword-ranking improvement process. Find a keyword sitting close to first place on Google, make exactly one change that closes the gap between what searchers want and what the page currently offers, then leave it alone for seven days before judging the result. Never touch more than one keyword per cycle. Never shorten the seven-day wait for any keyword, for any reason.

You have no memory between runs. Everything you need to know about past cycles lives in the four data files below — read them fresh every time, and never assume anything not written there.

## Data files (all under `data/seo/`)

- **`watchwords.json`** — tracked keywords, each with `keyword`, `targetPath`, `priority`.
- **`rank-history.json`** — append-only log of every measurement ever taken. Never edit or delete an existing entry. A correction is a new entry, not a rewrite.
- **`improvement-log.json`** — one entry per keyword worked on, with `status` (`active` / `observing` / `achieved`), `nextReviewDate`, and an `actions` array (each action has `date`, `rankAtAction`, `lever`, `needs`, `done`).
- **`content-briefs.json`** — for keywords with no existing target page. You never write a new article yourself; you write a brief (keyword, searcher intent, the gap, notes on competing pages) for a human to act on.

## Absolute guardrails

These apply to every step below, without exception:

- Never scrape Google's search results directly. Use the Search Console API (`scripts/fetch_gsc_ranks.mjs`) or a plain web search only.
- Work on exactly one keyword per cycle. Never more.
- Never shorten the seven-day observing cooldown for any keyword, for any reason.
- Never rewrite or delete a past entry in `rank-history.json`. Only append.
- Never print or commit credentials or secrets, in any file, commit message, PR description, or log output.
- A noindex change or a large structural change to a page is proposed for human approval — opened as a pull request with your reasoning in the description — never applied directly to `main`.
- Every edit to an existing post is proposed as a pull request. Never commit directly to `main`.
- Never state that a change caused a ranking improvement as settled fact. Report what changed; let the next real measurement decide.
- If nothing qualifies for improvement this cycle, change nothing — say so in the report and stop.
- Never act on a rank number backed by fewer than the minimum impression threshold (`SEO_MIN_IMPRESSIONS`, default 10). Treat it as noise, not signal.
- A keyword that has failed to improve past its retry cap (**3 unsuccessful cycles**) is flagged for human review, not retried automatically.
- Check a candidate keyword against the site's own other pages for cannibalization before working on it.
- Take a git commit snapshot of a page immediately before editing it, so any change can be reverted cleanly.

## Step 1 — Measure current rankings

Run `node .claude/skills/seo-rank-watch/scripts/fetch_gsc_ranks.mjs --mode append`. This queries Search Console for every keyword in `watchwords.json` and appends one dated entry per keyword to `rank-history.json`. The script itself enforces the minimum-impression threshold and refuses to overwrite existing entries — you do not need to re-check that logic, but you do need to read its output and treat any entry it marks `lowConfidence: true` as noise, not a real signal, for the rest of this cycle.

If the script fails (e.g. Search Console is unreachable), fall back to a plain web search for that keyword and note in the report that the number is approximate — personalization, location and device all shift what an individual search shows, so treat it as a stand-in only, never as authoritative.

A keyword showing a null rank with zero impressions is not automatically unindexed — before concluding it simply isn't ranking, check indexing status (URL Inspection via the API, or a site-restricted search).

## Step 2 — Review keywords whose wait is over

For every keyword in `improvement-log.json` with `status: "observing"` and a `nextReviewDate` that has arrived:

1. Run `node .claude/skills/seo-rank-watch/scripts/fetch_gsc_ranks.mjs --mode review --days 7` for that keyword. Use this 7-day average specifically, never the 28-day average — the shorter window isolates the effect of the recent change from longer-running trends.
2. Classify the result:
   - **Reached first place** → set `status: "achieved"`. It is now watched only, never edited again — unless a later measurement shows a competitor has overtaken it, in which case flag it (do not silently re-open it for editing without saying so in the report).
   - **Improved but not first** → set `status: "active"`, keep working it in a future cycle.
   - **No real change** → set `status: "active"`. Record that this lever did not work; the next cycle for this keyword must use a **different lever** than the one just tried.
3. Record the lever used (`title`, `meta_description`, `intro`, `faq`, `internal_links`, `missing_content`, or `missing_data`) as its own structured field in the action entry — never buried inside free text. This is what makes "don't repeat a failed lever" mechanical instead of a matter of re-reading prose.
4. Increment this keyword's unsuccessful-cycle count if the result was "no real change." If it has now failed **3** times, stop retrying it automatically: set a `flaggedForReview: true` field and explain why in the report, instead of queuing it for more work.
5. Note in the entry whether a known Google algorithm update fell inside this 7-day window, if you're aware of one. A broad update can move rankings independent of the edit — don't credit or blame the edit for movement that update explains.

Commit the updated `improvement-log.json` and `rank-history.json` (a plain commit to a working branch is fine for data files — these are logs, not content edits, and don't need PR review the way a post edit does).

## Step 3 — Choose one keyword for today

Exclude anything currently `observing` or `achieved`. Work down this priority order and stop at the first keyword that qualifies:

1. Ranked 2nd–10th, with impressions ≥ the minimum threshold, closest to first place first.
2. Ranked 11th–20th, with meaningful impressions.
3. Previously attempted keywords that improved but didn't reach first, or showed no effect (and haven't hit the retry cap).
4. High-priority keywords currently unranked.
5. Promising new queries surfacing in Search Console that aren't yet tracked — if you pick one from here, add it to `watchwords.json` first.

If nothing qualifies, stop here for this cycle. Say so plainly in the report. Do not force an improvement onto a keyword with no real opportunity.

**Before committing to a keyword**, check whether another page on this same site already targets it (search `watchwords.json` and do a quick content search across `content/posts`). If another page competes for the same keyword, skip this candidate and move to the next one in priority order — improving page A for a keyword page B also targets can just move traffic from B to A, or confuse Google about which page should rank. Note any near-miss cannibalization you find in the report even if you don't act on it.

## Step 4 — Understand what the searcher actually wants

Before making any change, write one or two sentences: who is searching this keyword, and what are they trying to accomplish. Then look at the current top 1–3 ranking pages (via web search) and compare them against the target page (or, if there is no target page yet, against what a page would need to cover).

Identify the gap — what does the searcher need that the target page doesn't currently give them. The goal is not to add words for length; it's to add exactly what closes that gap.

- Check for search-result features sitting above the organic listings — featured snippets, People Also Ask boxes, local packs. These often satisfy the searcher directly on the results page, so the real competition may be Google's own answer, not just the pages ranked #1–3. Let this shape what kind of content is actually worth adding.
- Check whether the keyword carries one dominant intent or a mix (e.g. "best running shoes" could mean buy now, read a roundup, or compare options). If the page assumes the wrong intent, added depth won't fix the mismatch — the lever needs to address intent, not just content volume.

## Step 5 — Make the improvement

**If `targetPath` exists** (an existing post):

1. Take a git commit snapshot of the page as it currently stands, before editing — this is the revert point if the change hurts rankings later.
2. Implement only what the Step 4 gap calls for, using exactly one lever: title, meta description, introduction, an FAQ section, missing content, internal links, or missing factual/numeric data.
3. Before adding new content, check it doesn't substantially duplicate content already on another page of this site (an article, a regional page, a detail page). Near-duplicate content across the site's own pages can dilute results rather than help.
4. Validate before proposing: confirm links resolve, structured data is valid, and the site still builds cleanly (run the project's build command). A content improvement that breaks something technical will hurt more than the original gap ever did.
5. If the change involves a `noindex` tag or a large structural change to the page, say so explicitly and prominently in the PR description — this is the category that most needs a human's attention before merging.
6. Open a pull request on a new branch (`seo-rank-watch/<keyword-slug>-<date>`) with a description containing: the keyword, the rank at time of action, the searcher intent identified in Step 4, the gap identified, the lever used, and a plain-language summary of the change. Label it `seo-rank-watch` if labels are available.

**If `targetPath` does not exist** (a content gap, no page to edit):

Do not draft or publish an article. Write an entry to `content-briefs.json` instead, containing: `keyword`, the searcher intent from Step 4, the identified gap, notes on what the competing top-ranking pages cover, and a suggested angle. This is a suggestion for a human to act on, not a queued task — it needs no PR, since no code or content changed.

Either way, exactly one keyword is worked on this cycle.

## Step 6 — Log the change and wait

For an edit: once the PR is opened (not merged — the observing clock starts when the change is proposed, so its effect can be measured once it actually goes live; note the PR's merge status in the log and don't start counting impressions until it's confirmed merged), record a new entry in `improvement-log.json`: `status: "observing"`, `nextReviewDate` seven days out, and an action containing the date, rank at time of action, the lever used, the identified need, and what was done.

For a content brief: no `improvement-log.json` entry is needed — the brief itself, sitting in `content-briefs.json`, is the record.

Commit the changed data files. A keyword marked `observing` is not touched again, for any reason, until its review date arrives — not even to re-measure it early out of curiosity.

## Reporting each cycle

Close every cycle with a short, honest report, covering:

- Keywords that moved significantly since the last cycle, up or down.
- The effect judgment for any keyword reviewed this cycle (Step 2), with a confidence note based on impression volume for every rank number cited — a report that just says "position improved" reads identically whether it rests on 500 impressions or 4; say which.
- Any keyword newly flagged for human review after hitting the retry cap.
- Any cannibalization risk noticed in Step 3, even if it didn't block the chosen keyword.
- The keyword chosen today and why, over the alternatives.
- The search need identified for it (Step 4).
- What was actually proposed (PR link, or the content brief), and whether it needs human approval beyond the usual merge (i.e. a noindex/structural change).
- Every keyword currently `observing`, with its review date.
- If nothing was worked on this cycle, say so and why.

Never claim a ranking change as caused by a specific edit. Report the change made; let next cycle's real measurement judge it.
