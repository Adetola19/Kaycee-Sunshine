# Integrations

## Enquiry form — pending configuration

The contact form (`src/components/forms/EnquiryForm.tsx`) posts JSON to `/api/enquiry`
(`src/app/api/enquiry/route.ts`). The route re-validates with the same rules as the browser
(`src/lib/enquiry.ts`), drops unknown fields, ignores honeypot submissions, and forwards the
enquiry to a webhook.

**Until `ENQUIRY_WEBHOOK_URL` is set, nothing is sent.** The route answers
`503 not_configured`, and the form tells the visitor plainly that online enquiries are not
connected yet and offers LinkedIn instead. It never shows a false success.

### Configure

| Variable | Required | Notes |
| --- | --- | --- |
| `ENQUIRY_WEBHOOK_URL` | yes | HTTPS endpoint accepting a JSON `POST`. Server-only. |
| `ENQUIRY_WEBHOOK_SECRET` | recommended | Sent as `Authorization: Bearer <secret>`; verify it at the receiver. |

Any of these work as the receiver: a Zapier or Make webhook that emails Kaycee or adds a
CRM record; a CRM's intake endpoint; or a small serverless function using an email API.

### Payload

```json
{
  "type": "speaking",
  "typeLabel": "Speaking or conference",
  "fields": { "name": "…", "email": "…", "organisation": "…", "location": "…", "format": "Keynote", "message": "…" },
  "submittedAt": "2026-10-28T14:08:38.411Z",
  "source": "website-contact-form"
}
```

`type` is one of `coaching`, `speaking`, `interpretation`, `language`, `partnership`,
`general`. The fields for each type are defined once in `src/lib/enquiry.ts`.

### Responses

| Status | Meaning | Visitor sees |
| --- | --- | --- |
| 200 | Webhook answered 2xx | "Thank you — your enquiry has been sent." |
| 422 | Validation failed | Field-level messages |
| 503 | Not configured | "Online enquiries are not connected yet…" + LinkedIn |
| 502 | Webhook failed or timed out (10s) | "Your enquiry could not be sent…" + LinkedIn |

Verified during QA with a local receiver: the secret header is sent and unknown keys are dropped.

**Before launch, consider:** rate limiting at the host (e.g. Vercel Firewall) or the receiver,
and replacing the LinkedIn fallback with Kaycee's preferred email once confirmed.

## YouTube

Videos listed in `src/content/media.ts` render as preview cards with the YouTube thumbnail
(`i.ytimg.com`, allowed in `next.config.ts`). The `youtube-nocookie.com` player loads only
when the visitor presses play, inside a modal. No API key is needed.

## Not integrated (no configuration or decision supplied)

Scheduling/booking, payments, CMS, analytics, newsletter, course enrolment platform. None are
simulated on the site; enrolment links appear once the owner supplies them.
