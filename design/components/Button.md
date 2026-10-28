# Button

One primary action per view, set in `forest` with `on-forest` text; everything else is the outline button.

**Markup:** an `<a class="kc-btn">` when it navigates, a `<button class="kc-btn">` when it acts. Add `kc-btn-primary` for the one primary action. An optional trailing `<span class="kc-arrow" aria-hidden="true">→</span>` nudges 4px on hover.

**On dark grounds** (`forest-ground`, `charcoal-ground`, `slate-ground`), wrap the area in `.kc-on-ground`. The primary button turns `champagne` with `on-sage` text, the outline button takes a `champagne` border, and the focus ring becomes `champagne`.

- Do: sentence case, verb first, and a named outcome ("Enquire about interpretation").
- Do: give every button a real destination. If the destination isn't defined yet, don't render the button.
- Don't: place two primary buttons side by side, use more than one arrow per group, or invent "Book now" flows.
- Height is 48px (44px in the nav), and the touch target is never under 44px.
