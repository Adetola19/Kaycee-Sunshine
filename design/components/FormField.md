# FormField

A labelled input with helper, error and status text, used for every enquiry form.

**Markup:** `<div class="kc-field">` containing a `<label for>`, a `.kc-input` (`input`, `select` or `textarea`) and an optional `.kc-help`. In the invalid state, add `.is-invalid`, set `aria-invalid="true"` and point `aria-describedby` at a `.kc-error` message.

- Labels always sit above the field. Never use placeholder-only labels.
- Errors say how to fix the problem, in a sentence. Validate on blur and on submit, not on every keystroke.
- Submission states: the idle state uses the button label; while sending, the button reads "Sending…" and is disabled; when sent, a `.kc-sent` message appears with `role="status"`; when it fails, a `.kc-error` message appears above the button with an email fallback.
- Fields by enquiry type:
  - **Speaking:** organisation, event name, date, location, audience and format.
  - **Coaching:** individual or organisation, and goals.
  - **Interpretation:** language pair, mode, date and setting.
  - **Language education:** course interest and level.
  - **Partnership:** organisation and proposal.
