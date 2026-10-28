/**
 * Enquiry types, their fields and validation — shared by the contact form
 * (client) and /api/enquiry (server). Kept dependency-free so it can be
 * unit-tested with `node --test`.
 */

export const enquiryTypes = ["coaching", "speaking", "interpretation", "language", "partnership", "general"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export type FieldKind = "text" | "email" | "date" | "textarea" | "select";

export type FieldDef = {
  name: string;
  label: string;
  kind: FieldKind;
  required: boolean;
  options?: readonly string[];
  help?: string;
  autoComplete?: string;
  maxLength: number;
  /** Two short fields may share a row on wider screens. */
  half?: boolean;
  /** Sentence shown when a required field is left empty. */
  requiredMessage?: string;
};

export type EnquiryTypeDef = {
  type: EnquiryType;
  label: string;
  summary: string;
  fields: FieldDef[];
};

const NOT_SURE = "Not sure yet";

export const commonFields: FieldDef[] = [
  { name: "name", label: "Full name", kind: "text", required: true, autoComplete: "name", maxLength: 120, half: true, requiredMessage: "Enter your full name." },
  { name: "email", label: "Email", kind: "email", required: true, autoComplete: "email", maxLength: 200, half: true },
];

export const enquiryTypeDefs: Record<EnquiryType, EnquiryTypeDef> = {
  coaching: {
    type: "coaching",
    label: "Leadership coaching",
    summary: "For yourself or your organisation",
    fields: [
      { name: "clientType", label: "Who is the coaching for?", kind: "select", required: true, options: ["For myself", "For my organisation or team"], maxLength: 60, half: true },
      { name: "organisation", label: "Organisation", kind: "text", required: false, autoComplete: "organization", maxLength: 160, half: true },
      { name: "goals", label: "What would you like to work on?", kind: "textarea", required: true, maxLength: 3000, help: "A few sentences on your goals and context is plenty.", requiredMessage: "Tell Kaycee a little about what you would like to work on." },
    ],
  },
  speaking: {
    type: "speaking",
    label: "Speaking or conference",
    summary: "Keynotes, workshops, leadership sessions",
    fields: [
      { name: "organisation", label: "Organisation", kind: "text", required: true, autoComplete: "organization", maxLength: 160, half: true },
      { name: "eventName", label: "Event name", kind: "text", required: false, maxLength: 160, half: true },
      { name: "eventDate", label: "Event date", kind: "date", required: false, maxLength: 10, half: true, help: "Leave blank if the date is not set." },
      { name: "location", label: "Location", kind: "text", required: true, maxLength: 160, half: true, help: "City and country, or online.", requiredMessage: "Enter the event location, or say that it is online." },
      { name: "format", label: "Format", kind: "select", required: true, options: ["Keynote", "Conference session", "Workshop", "Leadership class", "Panel or interview", NOT_SURE], maxLength: 60, half: true },
      { name: "audience", label: "Audience", kind: "text", required: false, maxLength: 200, half: true, help: "Who will attend, and roughly how many." },
      { name: "message", label: "Tell Kaycee about the event", kind: "textarea", required: true, maxLength: 3000, requiredMessage: "Tell Kaycee a little about the event." },
    ],
  },
  interpretation: {
    type: "interpretation",
    label: "Interpretation",
    summary: "Languages, setting and date",
    fields: [
      { name: "languagePair", label: "Languages required", kind: "text", required: true, maxLength: 160, half: true, help: "For example, from one language into another.", requiredMessage: "Enter the languages you need." },
      { name: "mode", label: "Mode", kind: "select", required: true, options: ["Simultaneous", "Consecutive", NOT_SURE], maxLength: 60, half: true, help: "Kaycee will confirm which formats suit your setting." },
      { name: "eventDate", label: "Date", kind: "date", required: false, maxLength: 10, half: true },
      { name: "setting", label: "Setting", kind: "text", required: true, maxLength: 200, half: true, help: "The occasion and subject matter.", requiredMessage: "Describe the setting, for example a conference or meeting." },
      { name: "message", label: "Anything else Kaycee should know", kind: "textarea", required: false, maxLength: 3000 },
    ],
  },
  language: {
    type: "language",
    label: "Language learning",
    summary: "Speak French Fast and lessons",
    fields: [
      { name: "courseInterest", label: "What are you interested in?", kind: "select", required: true, options: ["Speak French Fast", "Other language learning", NOT_SURE], maxLength: 60, half: true },
      { name: "level", label: "Current level", kind: "select", required: true, options: ["Beginner", "Intermediate", "Advanced", NOT_SURE], maxLength: 60, half: true },
      { name: "message", label: "Your goals", kind: "textarea", required: false, maxLength: 3000 },
    ],
  },
  partnership: {
    type: "partnership",
    label: "Media or partnership",
    summary: "Interviews, collaborations, proposals",
    fields: [
      { name: "organisation", label: "Organisation", kind: "text", required: true, autoComplete: "organization", maxLength: 160, half: true },
      { name: "enquiryKind", label: "Type of enquiry", kind: "select", required: true, options: ["Media or interview", "Partnership", "Other"], maxLength: 60, half: true },
      { name: "proposal", label: "Your proposal", kind: "textarea", required: true, maxLength: 3000, requiredMessage: "Describe your proposal in a few sentences." },
    ],
  },
  general: {
    type: "general",
    label: "General enquiry",
    summary: "BGYCC School of Leadership and anything else",
    fields: [
      { name: "topic", label: "Topic", kind: "select", required: true, options: ["BGYCC School of Leadership", "General question", "Other"], maxLength: 60 },
      { name: "message", label: "Message", kind: "textarea", required: true, maxLength: 3000, requiredMessage: "Write a short message." },
    ],
  },
};

export function isEnquiryType(value: unknown): value is EnquiryType {
  return typeof value === "string" && (enquiryTypes as readonly string[]).includes(value);
}

export function fieldsFor(type: EnquiryType): FieldDef[] {
  return [...commonFields, ...enquiryTypeDefs[type].fields];
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Returns an error sentence for one field, or null when valid. */
export function validateField(field: FieldDef, raw: unknown): string | null {
  const value = typeof raw === "string" ? raw.trim() : "";
  if (!value) return field.required ? requiredMessage(field) : null;
  if (value.length > field.maxLength) return `Please keep this under ${field.maxLength} characters.`;
  if (field.kind === "email" && !EMAIL.test(value)) return "Enter an email address like name@organisation.com.";
  if (field.kind === "date" && (!ISO_DATE.test(value) || Number.isNaN(Date.parse(value)))) return "Enter the date as day, month and year.";
  if (field.kind === "select" && field.options && !field.options.includes(value)) return "Choose one of the options.";
  return null;
}

function requiredMessage(field: FieldDef): string {
  if (field.requiredMessage) return field.requiredMessage;
  if (field.name === "organisation") return "Enter the name of your organisation.";
  if (field.kind === "select") return `Choose an option for “${field.label.replace(/\?$/, "")}”.`;
  if (field.kind === "email") return "Enter your email address so Kaycee can reply.";
  return `Enter ${field.label.charAt(0).toLowerCase()}${field.label.slice(1)}.`;
}

export type Enquiry = {
  type: EnquiryType;
  fields: Record<string, string>;
};

export type ValidationResult =
  | { ok: true; enquiry: Enquiry }
  | { ok: false; errors: Record<string, string> };

/** Validates a full submission. Unknown keys are dropped. */
export function validateEnquiry(input: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};
  if (!isEnquiryType(input.type)) return { ok: false, errors: { type: "Choose what your enquiry is about." } };
  const type = input.type;

  const fields: Record<string, string> = {};
  for (const field of fieldsFor(type)) {
    const error = validateField(field, input[field.name]);
    if (error) errors[field.name] = error;
    else if (typeof input[field.name] === "string" && (input[field.name] as string).trim()) {
      fields[field.name] = (input[field.name] as string).trim();
    }
  }
  if (input.consent !== true && input.consent !== "on" && input.consent !== "true") {
    errors.consent = "Please confirm that Kaycee may use these details to reply.";
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, enquiry: { type, fields } };
}
