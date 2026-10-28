"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  commonFields,
  enquiryTypeDefs,
  enquiryTypes,
  fieldsFor,
  validateField,
  type EnquiryType,
  type FieldDef,
} from "@/lib/enquiry";
import { socials } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";

type Status = "idle" | "sending" | "sent" | "failed";

function omit(errors: Record<string, string>, key: string): Record<string, string> {
  if (!(key in errors)) return errors;
  const next = { ...errors };
  delete next[key];
  return next;
}

const FAILURE: Record<string, string> = {
  not_configured:
    "Online enquiries are not connected yet, so your message was not sent. Please reach Kaycee on LinkedIn while this is being set up.",
  default: "Your enquiry could not be sent. Please try again in a moment, or reach Kaycee on LinkedIn.",
};

/** Enquiry form — design/components/FormField.md. Fields follow the chosen enquiry type. */
export function EnquiryForm({ initialType }: { initialType?: EnquiryType }) {
  const [type, setType] = useState<EnquiryType | null>(initialType ?? null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const fields = type ? enquiryTypeDefs[type].fields : [];

  const setValue = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    // Clear an error as soon as the field becomes valid; never add errors while typing.
    if (errors[name] && type) {
      const def = fieldsFor(type).find((f) => f.name === name);
      if (def && !validateField(def, value)) setErrors((e) => omit(e, name));
    }
  };

  const onBlur = (field: FieldDef) => {
    const error = validateField(field, values[field.name]);
    setErrors((errs) => (error ? { ...errs, [field.name]: error } : omit(errs, field.name)));
  };

  const focusFirstError = (errs: Record<string, string>) => {
    const first = Object.keys(errs)[0];
    if (!first) return;
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    if (!type) {
      const errs = { type: "Choose what your enquiry is about." };
      setErrors(errs);
      focusFirstError(errs);
      return;
    }

    const errs: Record<string, string> = {};
    for (const field of fieldsFor(type)) {
      const error = validateField(field, values[field.name]);
      if (error) errs[field.name] = error;
    }
    if (!consent) errs.consent = "Please confirm that Kaycee may use these details to reply.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }

    setStatus("sending");
    setFailure("");
    const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    const payload: Record<string, unknown> = { type, consent, website: honeypot };
    for (const field of fieldsFor(type)) payload[field.name] = values[field.name] ?? "";

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; errors?: Record<string, string> };
      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        focusFirstError(data.errors);
        return;
      }
      setFailure(FAILURE[data.error ?? ""] ?? FAILURE.default);
      setStatus("failed");
    } catch {
      setFailure(FAILURE.default);
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div className="kc-form__status" role="status" tabIndex={-1} ref={(el) => el?.focus()}>
        <p className="kc-sent">
          <Icon name="check" className="kc-icon--lg" />
          <span>
            Thank you — your enquiry has been sent. Kaycee will reply to {values.email}.{" "}
            <Pending>typical response time</Pending>
          </span>
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="kc-form" noValidate onSubmit={onSubmit} aria-describedby="form-note">
      <fieldset aria-describedby={errors.type ? "type-error" : undefined}>
        <legend className="t-h3">What is your enquiry about?</legend>
        <div className="type-picker">
          {enquiryTypes.map((t) => (
            <label className="type-option" key={t}>
              <input
                type="radio"
                name="type"
                value={t}
                checked={type === t}
                onChange={() => {
                  setType(t);
                  setErrors((e) => omit(e, "type"));
                }}
              />
              <span>
                <strong>{enquiryTypeDefs[t].label}</strong>
                <small>{enquiryTypeDefs[t].summary}</small>
              </span>
            </label>
          ))}
        </div>
        {errors.type && (
          <p className="kc-error" id="type-error" style={{ marginTop: "var(--space-3)" }}>
            {errors.type}
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend className="t-h3">Your details</legend>
        <div className="kc-form__row kc-form__row--2">
          {commonFields.map((f) => (
            <Field key={f.name} field={f} value={values[f.name] ?? ""} error={errors[f.name]} onChange={setValue} onBlur={onBlur} />
          ))}
        </div>
      </fieldset>

      {type && (
        <fieldset key={type} className="fields-swap">
          <legend className="t-h3">About your {enquiryTypeDefs[type].label.toLowerCase()} enquiry</legend>
          <div className="kc-form__row kc-form__row--2">
            {fields.map((f) => (
              <div key={f.name} style={f.half ? undefined : { gridColumn: "1 / -1" }}>
                <Field field={f} value={values[f.name] ?? ""} error={errors[f.name]} onChange={setValue} onBlur={onBlur} />
              </div>
            ))}
          </div>
        </fieldset>
      )}

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={errors.consent ? "kc-field is-invalid" : "kc-field"}>
        <label className="kc-check">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setErrors((errs) => omit(errs, "consent"));
            }}
          />
          <span>
            Kaycee may use these details to reply to this enquiry. Read the{" "}
            <Link className="kc-link kc-link-static" href="/privacy">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p className="kc-error" id="consent-error">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "failed" && (
        <div className="kc-form__status kc-form__status--failed" role="alert">
          <p className="kc-error">{failure}</p>
          <p className="t-small" style={{ marginTop: "var(--space-2)" }}>
            <a className="kc-link kc-link-static" href={socials.linkedin.href} target="_blank" rel="noopener noreferrer">
              Message Kaycee on LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      )}

      <div className="actions">
        <button type="submit" className="kc-btn kc-btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
          {status !== "sending" && <Icon name="arrow-right" className="kc-arrow" />}
        </button>
        <p id="form-note" className="t-meta">
          Fields without “optional” are required.
        </p>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">
        {status === "sending" ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}

type FieldProps = {
  field: FieldDef;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
  onBlur: (field: FieldDef) => void;
};

function Field({ field, value, error, onChange, onBlur }: FieldProps) {
  const id = `f-${field.name}`;
  const describedBy = [field.help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    name: field.name,
    className: "kc-input",
    value,
    required: field.required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    onBlur: () => onBlur(field),
  } as const;

  return (
    <div className={error ? "kc-field is-invalid" : "kc-field"}>
      <label htmlFor={id}>
        {field.label}
        {!field.required && <span className="kc-optional"> (optional)</span>}
      </label>
      {field.kind === "textarea" ? (
        <textarea {...common} maxLength={field.maxLength} rows={5} onChange={(e) => onChange(field.name, e.target.value)} />
      ) : field.kind === "select" ? (
        <select {...common} onChange={(e) => onChange(field.name, e.target.value)}>
          <option value="">Choose…</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={field.kind}
          maxLength={field.maxLength}
          autoComplete={field.autoComplete}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )}
      {field.help && (
        <span className="kc-help" id={`${id}-help`}>
          {field.help}
        </span>
      )}
      {error && (
        <p className="kc-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
