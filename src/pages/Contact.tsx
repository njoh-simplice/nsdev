import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { usePageMeta } from "../hooks/usePageMeta";

/* ------------------------------------------------------------------ */
/* Section 1 — contact info cards                                     */
/* ------------------------------------------------------------------ */

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-card border border-on-dark-muted/15 bg-brand-charcoal p-6 text-center transition-colors hover:border-on-dark-muted/40">
      <span className="text-brand-lime">{icon}</span>
      <span className="font-body text-xs uppercase tracking-wide text-on-dark-muted">
        {label}
      </span>
      <a
        href={href}
        className="font-body font-semibold text-on-dark hover:text-brand-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark"
      >
        {value}
      </a>
    </div>
  );
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "size-7",
  "aria-hidden": true,
};

const PhoneIcon = (
  <svg {...iconProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = (
  <svg {...iconProps}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Section 2 — form                                                  */
/* ------------------------------------------------------------------ */

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  accepted: boolean;
}

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  accepted: false,
};

const TEXT_FIELDS = [
  {
    name: "firstName",
    label: "First name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Last name",
    type: "text",
    autoComplete: "family-name",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone number (optional)",
    type: "tel",
    autoComplete: "tel",
  },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN = 20;

function validate(f: FormState): Partial<Record<keyof FormState, string>> {
  const e: Partial<Record<keyof FormState, string>> = {};
  if (!f.firstName.trim()) e.firstName = "First name is required.";
  if (!f.lastName.trim()) e.lastName = "Last name is required.";
  if (!f.email.trim()) e.email = "Email address is required.";
  else if (!EMAIL_RE.test(f.email.trim()))
    e.email = "Enter a valid email address.";
  if (!f.subject.trim()) e.subject = "Subject is required.";
  if (!f.message.trim()) e.message = "Message is required.";
  else if (f.message.trim().length < MESSAGE_MIN)
    e.message = `Message must be at least ${MESSAGE_MIN} characters.`;
  if (!f.accepted) e.accepted = "You must accept the legal information.";
  return e;
}

const fieldClass =
  "w-full rounded-button border border-on-dark-muted/25 bg-brand-charcoal px-3 py-2 font-body text-on-dark transition-colors placeholder:text-on-dark-muted/50 focus:outline-none focus-visible:border-brand-lime";
const labelClass = "font-body text-sm text-on-dark";
const errorClass = "font-body text-sm font-medium text-on-dark-muted";

export default function Contact() {
  usePageMeta(
    "Contact — Njoh Simplice Junior",
    "Get in touch with Njoh Simplice Junior — email contact@nsdev.me, phone +237 652 02 59 01, based in Yaoundé, Cameroon.",
  );

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const errorFor = (name: keyof FormState) =>
    (touched[name] || submitAttempted) && errors[name] ? errors[name] : null;

  const setField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const markTouched = (name: keyof FormState) =>
    setTouched((prev) => ({ ...prev, [name]: true }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitAttempted(true);
    if (!isValid) return;

    setSubmitting(true);
    // TODO: real submission goes here once a backend / email service is
    // chosen (e.g. POST to a Cloudflare Worker, or an API like Resend /
    // Formspree). Right now nothing is sent anywhere — this is a mock.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section className="bg-brand-black px-4 py-16 text-on-dark sm:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-[1.75rem] text-center font-bold uppercase leading-tight md:text-[2.5rem]">
          Contact
        </h1>

        {/* SECTION 1 — contact info */}
        <h2 className="mt-10 font-display text-center text-lg font-bold uppercase text-on-dark">
          Reach me directly
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ContactCard
            icon={PhoneIcon}
            label="Phone"
            value="+237 652 02 59 01"
            href="tel:+237652025901"
          />
          <ContactCard
            icon={MailIcon}
            label="Email"
            value="contact@nsdev.me"
            href="mailto:contact@nsdev.me"
          />
        </div>

        {/* SECTION 2 — form */}
        <h2 className="mt-12 font-display text-center text-lg font-bold uppercase text-on-dark">
          Send a message
        </h2>

        {submitted ? (
          <div
            role="status"
            className="mt-4 rounded-card border border-on-dark-muted/15 bg-brand-charcoal p-6 text-center"
          >
            <p className="font-display text-xl font-bold text-on-dark">
              Message sent
            </p>
            <p className="mt-2 font-body text-on-dark-muted">
              Thanks for reaching out — I&rsquo;ll get back to you as soon as I
              can.
            </p>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="mt-4 space-y-4">
            {TEXT_FIELDS.map((field) => {
              const error = errorFor(field.name);
              const required = field.name !== "phone";
              return (
                <div key={field.name}>
                  <label htmlFor={field.name} className={labelClass}>
                    {field.label}
                    {required && (
                      <span aria-hidden="true" className="text-on-dark-muted">
                        {" "}
                        *
                      </span>
                    )}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required={required}
                    aria-required={required || undefined}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${field.name}-error` : undefined}
                    value={form[field.name]}
                    onChange={setField}
                    onBlur={() => markTouched(field.name)}
                    className={`mt-1 ${fieldClass}`}
                  />
                  {error && (
                    <p
                      id={`${field.name}-error`}
                      className={`mt-1 ${errorClass}`}
                    >
                      {error}
                    </p>
                  )}
                </div>
              );
            })}

            <div>
              <label htmlFor="message" className={labelClass}>
                Message
                <span aria-hidden="true" className="text-on-dark-muted">
                  {" "}
                  *
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                aria-invalid={errorFor("message") ? true : undefined}
                aria-describedby={
                  errorFor("message") ? "message-error" : undefined
                }
                value={form.message}
                onChange={setField}
                onBlur={() => markTouched("message")}
                className={`mt-1 resize-y ${fieldClass}`}
              />
              {errorFor("message") && (
                <p id="message-error" className={`mt-1 ${errorClass}`}>
                  {errorFor("message")}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-2 font-body text-sm text-on-dark">
                <input
                  type="checkbox"
                  name="accepted"
                  checked={form.accepted}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      accepted: event.target.checked,
                    }))
                  }
                  onBlur={() => markTouched("accepted")}
                  aria-invalid={errorFor("accepted") ? true : undefined}
                  aria-describedby={
                    errorFor("accepted") ? "accepted-error" : undefined
                  }
                  className="mt-0.5 size-4 shrink-0 accent-brand-lime"
                />
                <span>
                  I have read and accept the{" "}
                  <Link
                    to="/legal-mentions"
                    className="text-brand-mint underline underline-offset-2"
                  >
                    legal information
                  </Link>
                </span>
              </label>
              {errorFor("accepted") && (
                <p id="accepted-error" className={`mt-1 ${errorClass}`}>
                  {errorFor("accepted")}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disableMotion
              loading={submitting}
              disabled={!isValid}
            >
              Send Message
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
