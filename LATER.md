# Later

Known issues and follow-ups for the next prototype. Not published; the site only serves index.html.

## Merging into main

Running list, so merges between main and next need no guesswork. Shared fixes go to main first, then merge into
next; next-only features wait for James's approval to merge into main.

**Shared fixes (already on both):**
- Toast Undo stays on one line (main 339c9a2, merged Oct 31). Same code on both.
- Tour: Library stop opens its own tab; elevator numbering for 13 stops (main 4f67823, merged Nov 2). **next's
  version wins**: it adds the Discover and Your Next Read stops and resets the Discover view (`lib.rv='disc'`),
  which main doesn't have.
- Undo in messages works while a window is open: the message goes inside the open window (main 6f4d203, merged
  Nov 2). Same code on both.
- Undo from a message also redraws the open window (main 89a9a48, merged Nov 2). Same code on both; on next,
  the shared redraw also covers the finish window.

**next-only (waiting to merge into main):** Discover release 1 (2a–2h), "Finished, date unknown", and later changes: Discover as a Library
tab, lean cards, ghost card, finish window (queue, rate, thank, recommend), finished-only ratings, Did Not Finish
reasons, include my rating, rating label follows sharing, Recommend a Book on every tab, English editions and
Open Library matching, book descriptions (2i). When merging next into main, next's version wins everywhere.

**Changes on next that fix main behavior too** (come over with the merge; James chose next first):
- One click opens book details from Currently Reading (large cover and title) and Paused Books, on My Reading;
  double-click and press-and-hold to edit are removed; small covers in Currently Reading still switch books
  (Nov 2). Main still uses double-click there.
- Mouse or trackpad clicks outside book, challenge, and Battle of the Books details close them (a text box in use
  takes the first click; an unsent borrow or reply note blocks it); forms never close that way; finger taps never
  close any window (Nov 2). Main windows don't close on outside clicks.
- Tab rows that don't fit (book details, Library, Challenges) show a fade and a chevron on the side with hidden
  tabs; the book details tab reads "Activity", with the group name inside the tab (Nov 2). Main has peek only.
- Tabs use flexible spacing (gaps shrink before scrolling), and windows use a 16 px side margin at 400 px and
  narrower (main uses 22 px everywhere) (Nov 2). Target: everything fits at 360 px; 320 px still works. Inside windows, tabs
  spread across the row when there's room; pages stay left-aligned. James: if the spread look doesn't hold up,
  leave it for later rather than chase it.

## Test on /next/ after the push

- ~~Undo in the finish window~~: tested by James Oct 31, 2026, working.
- ~~More by This Author with real data~~: tested by James Oct 31, 2026, working.
- ~~English editions~~: Judy Moody, M.D. and The Martian passed (James, Nov 2).
- ~~Read Free Online~~: passed with This Side of Paradise on the Internet Archive (James, Nov 2).

## Planned

- **Book descriptions (2i)**: built Nov 2, 2026 (plan: `plans/Book_Descriptions.md`): member-written, Open Library
  (saved), and Google Books (fetched when a book opens and no other description exists, never saved, shown as given
  with the "powered by Google" image and a link to the book's Google Books page; no preview of Google text away from
  that attribution). Google's Books API terms and branding guidelines read Nov 2. Google Books key published Nov 2 at
  James's instruction; Google restricts it to gravityoptional.github.io and the Books API (checked: other sites
  are refused).
- **Before the live beta (Google Books terms):** rights holders must be able to ask for content removal, so the
  live site needs a contact for that (the Send Feedback address could serve). No fees may be charged for the app.

## Issues

- **Tall card rows on phones (Discover).** Cards in a row share row heights so their buttons line up. In a
  sideways-scrolling phone row, one long title off screen makes every card in that row taller, leaving empty
  space above the buttons. Not acceptable as a permanent solution. Likely fix: cap titles at three lines with
  the full title in book details, and size rows to what's visible.
- **WorldCat "Error 1015" on the first Find at Your Library click** (seen Oct 31, 2026; the same link worked on
  retry). WorldCat's traffic protection, not Reading Room. If it recurs, switch the link target.
- **Ghost card after Not for Me** (trying it, Oct 31): faded in place with "Hidden · Undo" for 5 seconds, paused
  while the pointer rests on it or the keyboard is on Undo (Nov 2). Also on group recommendation cards. James (Nov 2):
  5 seconds acceptable, 6 better; the mouse pause can look stuck; idea to discuss: after the pointer leaves, a
  short 2-second ghost. Don't change yet.
- **Battle window tabs look airy** on desktop (three tabs spread across the window). Discuss: cap the gap and
  center the group instead.
- **Language setting** (James agreed Oct 31; do it at the very end): Open Library lookups prefer English editions, fixed in code. Add a
  member setting (for example Spanish) that sets the preferred edition language. The same setting should set Google Books' country
  (`GB_COUNTRY`, fixed to US for now).
- **Did Not Finish reasons** (James, Oct 31): the list is fine for now (Not for me, Too slow, Not the right time,
  Content I didn't want, Had to return it); revisit later. Possible later use: "Not for me" as a soft Not for Me
  for that author in Discover.
