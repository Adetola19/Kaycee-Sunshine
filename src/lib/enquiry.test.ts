import { test } from "node:test";
import assert from "node:assert/strict";
import { enquiryTypeDefs, fieldsFor, isEnquiryType, validateEnquiry, validateField } from "./enquiry.ts";

const base = { name: "Ada Okafor", email: "ada@example.org", consent: true };

test("rejects an unknown enquiry type", () => {
  const result = validateEnquiry({ ...base, type: "booking" });
  assert.equal(result.ok, false);
  if (!result.ok) assert.ok(result.errors.type);
});

test("requires name, email, consent and type-specific fields", () => {
  const result = validateEnquiry({ type: "speaking" });
  assert.equal(result.ok, false);
  if (!result.ok) {
    for (const key of ["name", "email", "consent", "organisation", "location", "format", "message"]) {
      assert.ok(result.errors[key], `expected an error for ${key}`);
    }
    assert.equal(result.errors.eventName, undefined, "optional fields stay optional");
  }
});

test("accepts a complete speaking enquiry and drops unknown keys", () => {
  const result = validateEnquiry({
    ...base,
    type: "speaking",
    organisation: "Example Org",
    location: "Online",
    format: "Keynote",
    message: "  A leadership summit.  ",
    eventDate: "2027-03-14",
    injected: "<script>",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.enquiry.fields.message, "A leadership summit.");
    assert.equal(result.enquiry.fields.injected, undefined);
  }
});

test("validates email, date, select options and length", () => {
  const email = fieldsFor("general").find((f) => f.name === "email")!;
  assert.ok(validateField(email, "ada@"));
  assert.equal(validateField(email, "ada@example.org"), null);

  const date = enquiryTypeDefs.interpretation.fields.find((f) => f.name === "eventDate")!;
  assert.ok(validateField(date, "14/03/2027"));
  assert.equal(validateField(date, ""), null);

  const mode = enquiryTypeDefs.interpretation.fields.find((f) => f.name === "mode")!;
  assert.ok(validateField(mode, "Telepathic"));

  const name = fieldsFor("general")[0];
  assert.ok(validateField(name, "x".repeat(500)));
});

test("every enquiry type has a summary and at least one specific field", () => {
  for (const [key, def] of Object.entries(enquiryTypeDefs)) {
    assert.ok(isEnquiryType(key));
    assert.ok(def.summary.length > 0);
    assert.ok(def.fields.length > 0);
  }
});
