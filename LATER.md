# Later

Known issues and follow-ups for the next prototype. Not published; the site only serves index.html.

- **Tall card rows on phones (Discover).** Cards in a row share row heights so their buttons line up. In a
  sideways-scrolling phone row, one long title off screen makes every card in that row taller, leaving empty
  space above the buttons. Not acceptable as a permanent solution. Likely fix: cap titles at three lines with
  the full title in book details, and size rows to what's visible.
- **WorldCat "Error 1015" on the first Find at Your Library click** (seen Oct 31, 2026; the same link worked on
  retry). WorldCat's traffic protection, not Reading Room. If it recurs, switch the link target.
