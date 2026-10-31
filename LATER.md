# Later

Known issues and follow-ups for the next prototype. Not published; the site only serves index.html.

## Test on /next/ after the push

- **Undo in the finish window** (beside "That's N books this year"): James asked to test this specifically. Mark a
  book finished, tap Undo, and confirm the book is back in Currently Reading with nothing else changed.
- Discover with real Open Library data: More by This Author picks for the family's top authors, and that Read Free
  Online and Borrow Free on Open Library open the right book.

## Issues

- **Tall card rows on phones (Discover).** Cards in a row share row heights so their buttons line up. In a
  sideways-scrolling phone row, one long title off screen makes every card in that row taller, leaving empty
  space above the buttons. Not acceptable as a permanent solution. Likely fix: cap titles at three lines with
  the full title in book details, and size rows to what's visible.
- **WorldCat "Error 1015" on the first Find at Your Library click** (seen Oct 31, 2026; the same link worked on
  retry). WorldCat's traffic protection, not Reading Room. If it recurs, switch the link target.
- **Toast "Undo" wraps to "Un / do" at 320 px.** Affects every toast in both prototypes, so the fix belongs on
  main first (awaiting James's go-ahead). Fix: keep the Undo button on one line.
