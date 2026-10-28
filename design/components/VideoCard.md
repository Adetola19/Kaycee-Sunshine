# VideoCard

A preview card for a real YouTube video from @coachkayceesunshine. Clicking it loads the player, and it never autoplays.

**Markup:** `<button class="kc-video">` containing `.kc-thumb` (the YouTube thumbnail `<img>` with its real `alt`, plus a `.kc-play` pill showing the duration), an `h3` with the exact video title, and a `.kc-meta` source line.

**Your script:** on activation, swap the thumbnail for a `youtube-nocookie.com/embed/<id>` iframe in place, or open it in a modal on `scrim` with `shadow-float`. The modal traps focus, closes on Esc and returns focus to the card.

- Use exact titles, thumbnails and durations from the channel. Never invent a video.
- On hover, the scrim lightens and the play pill lifts 2px. There is no zoom.
