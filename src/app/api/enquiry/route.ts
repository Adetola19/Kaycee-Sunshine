import { NextResponse } from "next/server";
import { enquiryTypeDefs, validateEnquiry } from "@/lib/enquiry";

/**
 * POST /api/enquiry
 *
 * Integration interface (pending configuration — see docs/INTEGRATIONS.md):
 * validated enquiries are forwarded as JSON to ENQUIRY_WEBHOOK_URL:
 *   { type, typeLabel, fields: { name, email, ... }, submittedAt, source }
 * with "Authorization: Bearer ENQUIRY_WEBHOOK_SECRET" when the secret is set.
 *
 * Responses:
 *   200 { ok: true }                       delivered (the webhook answered 2xx)
 *   422 { errors: { field: message } }     validation failed
 *   503 { error: "not_configured" }        no webhook configured — nothing was sent
 *   502 { error: "delivery_failed" }       the webhook did not accept it
 */

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;

export async function POST(request: Request) {
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return NextResponse.json({ error: "too_large" }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Drop silently.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validateEnquiry(body);
  if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: 422 });

  const webhook = process.env.ENQUIRY_WEBHOOK_URL?.trim();
  if (!webhook) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = process.env.ENQUIRY_WEBHOOK_SECRET?.trim();
  if (secret) headers.Authorization = `Bearer ${secret}`;

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers,
      body: JSON.stringify({
        type: result.enquiry.type,
        typeLabel: enquiryTypeDefs[result.enquiry.type].label,
        fields: result.enquiry.fields,
        submittedAt: new Date().toISOString(),
        source: "website-contact-form",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
