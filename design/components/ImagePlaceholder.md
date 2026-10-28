# ImagePlaceholder

A clearly labelled `sage` frame that stands in for a photograph the owner still has to supply, so a temporary image is never mistaken for a real one.

**Markup:** `<div class="kc-ph" role="img" aria-label="Placeholder: …">` with a `<span>` label written as `Replace · <shot>, <ratio>`. Set the size with `aspect-ratio`: 4:5 for portraits, 21:9 or 16:9 for events, 1:1 for details.

- Log every placeholder in the owner's asset list with the shot, ratio and section it belongs to.
- Ship real photography once it's available. Never ship a placeholder on a live page without the label.
