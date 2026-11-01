# Later

Known issues and follow-ups for the next prototype. Not published; the site only serves index.html.

## Test on /next/ after the push

- ~~Undo in the finish window~~: tested by James Nov 1, 2026, working.
- ~~More by This Author with real data~~: tested by James Nov 1, 2026, working.
- **Borrow Free on Open Library** now opens the book's main Open Library page and asks for English editions (the
  Judy Moody link opened a Dutch edition). Recheck Judy Moody, M.D.
- **Read Free Online**: not yet tested with a real free book. The This Side of Paradise cover and scan were a
  wrong match (an American Film magazine scan); matching is fixed and old matches are re-checked once. Recheck it.

## Issues

- **Tall card rows on phones (Discover).** Cards in a row share row heights so their buttons line up. In a
  sideways-scrolling phone row, one long title off screen makes every card in that row taller, leaving empty
  space above the buttons. Not acceptable as a permanent solution. Likely fix: cap titles at three lines with
  the full title in book details, and size rows to what's visible.
- **WorldCat "Error 1015" on the first Find at Your Library click** (seen Oct 31, 2026; the same link worked on
  retry). WorldCat's traffic protection, not Reading Room. If it recurs, switch the link target.
- **Not for Me mis-taps leave no trace** on site suggestions (quiet hide by design). Recovery is through the book's
  details. If testers report it, add a short "Hidden · Undo" in the card's place for a few seconds.
