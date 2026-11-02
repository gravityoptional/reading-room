# Later

Known issues and follow-ups for the next prototype. Not published; the site only serves index.html.

## Test on /next/ after the push

- ~~Undo in the finish window~~: tested by James Oct 31, 2026, working.
- ~~More by This Author with real data~~: tested by James Oct 31, 2026, working.
- **Borrow Free on Open Library / Read Free Online** now link to the first English edition with a scan, found in
  the background (the main page still chose foreign editions: a Dutch Judy Moody, a French Martian). Recheck
  Judy Moody, M.D. and The Martian; the link updates a moment after the card first appears.
- **Read Free Online**: not yet tested with a real free book (James couldn't find one, Oct 31). The This Side of Paradise cover and scan were a
  wrong match (an American Film magazine scan); matching is fixed and old matches are re-checked once. Recheck it.

## Planned

- **Book descriptions (2i)**: built Nov 2, 2026 (plan: `plans/Book_Descriptions.md`) with member-written and Open
  Library descriptions, the About tab, the preview, and display-only title case. **Google Books is not built yet**:
  the plan requires reading Google's current Books API terms first, and developers.google.com isn't reachable from
  the build session. Allow it in the environment's network settings, then add it. Coverage test (20 family books)
  still to do on /next/.

## Issues

- **Tall card rows on phones (Discover).** Cards in a row share row heights so their buttons line up. In a
  sideways-scrolling phone row, one long title off screen makes every card in that row taller, leaving empty
  space above the buttons. Not acceptable as a permanent solution. Likely fix: cap titles at three lines with
  the full title in book details, and size rows to what's visible.
- **WorldCat "Error 1015" on the first Find at Your Library click** (seen Oct 31, 2026; the same link worked on
  retry). WorldCat's traffic protection, not Reading Room. If it recurs, switch the link target.
- **Ghost card after Not for Me** (trying it, Oct 31): faded in place with "Hidden · Undo" for 5 seconds, paused
  while the pointer rests on it or the keyboard is on Undo (Nov 2). Also on group recommendation cards. Judge on /next/.
- **Language setting** (James agreed Oct 31): Open Library lookups prefer English editions, fixed in code. Add a
  member setting (for example Spanish) that sets the preferred edition language.
- **Did Not Finish reasons** (James, Oct 31): the list is fine for now (Not for me, Too slow, Not the right time,
  Content I didn't want, Had to return it); revisit later. Possible later use: "Not for me" as a soft Not for Me
  for that author in Discover.
