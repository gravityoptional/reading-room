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
- Fix bundle (main 9b94137 + f54bef0, merged Nov 2): timer Resume and Start Over at 0:00; the Minutes box takes
  hours (90, 1:30, 2h 30m) with "= 1h 30m" under it; a day can't pass 24 hours, and over 8 hours or 500 pages the
  form asks "Is that right?" (the timer asks whether it kept running); catch-up entries ("Covers more than one
  day": count toward totals, hours and pages goals, and challenges whose dates hold the whole stretch, never
  streaks, daily goals, or reading days); Duplicate on every challenge and Battle of the Books (month or year in
  the name moves forward; otherwise the name is selected to type over; Battles carry no readers, picks,
  moderator, or results); Count It for list books finished before a challenge started, and a start-date warning
  in the form; sample audiobooks (Project Hail Mary in progress, The Martian finished and unrated, Pride and
  Prejudice to read), added once to saved data. Same code on both, except next keeps "Finished, date unknown" in
  the Add Progress list.
- Polish bundle (main, merged Nov 3): tabs (Library, Challenges, book details, Battle) work with arrow keys,
  Home and End, keep focus after switching, and name their panels; Add a Book and cover source switches are toggle
  buttons; the goal option reads "Minutes or pages, whichever I reach first"; the greeting drops "Just" ("20 more
  minutes to reach today's goal." / "20 minutes or 15 pages to go today."); Edit Goal is green; shorter Log
  Reading form (no Book label, no Mark as finished checkbox since Status does it, help line only for audiobooks and
  new books, Read with someone? folds the names, Date and Covers more than one day share a row, the note is one
  line that grows, its count shows from 150 characters). next's own book details and Library templates carry the
  same tab attributes; next also keeps focus through any book details redraw.

**next-only (waiting to merge into main):** Discover release 1 (2a–2h), "Finished, date unknown", and later changes: Discover as a Library
tab, lean cards, ghost card, finish window (queue, rate, thank, recommend), finished-only ratings, Did Not Finish
reasons, include my rating, rating label follows sharing, Recommend a Book on every tab, English editions and
Open Library matching, book descriptions (2i), more than one Did Not Finish reason, which tab book details
open on (My Reading for your books, Copies for the group library, owned To Read books, and copy notices; About
elsewhere), optional stars in Recommend for finished books you haven't rated, and the Recommend form keeping its
choices when the window redraws. When merging next into main, next's version wins everywhere.

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

- **Premade challenges** (James, Nov 2; separate from Discover, discuss later): ready-made challenges a member can
  start in one step (for example a month of reading days, a genre or series list, a books-this-year goal), alongside
  Create Challenge and the planned way to duplicate any challenge.

- **Adjust Dashboard Photo** (James, Nov 2; later, cosmetic only): the member's Dashboard photo is always centered.
  Idea: Adjust Photo beside Change and Remove: drag it up, down or sideways, Flip (mirror) and possibly Rotate.
  Shared with main. Book covers stay as they are.

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
  short 2-second ghost. Built Nov 2: 6 seconds; waits while the pointer rests on it or the keyboard is on Undo, then
  2 seconds after it leaves.
- **Window tabs** (Nov 2): gaps capped at 64 px with the group centered (the battle window's three tabs no longer
  sit at the edges).
- **Free sources** (Nov 2): Project Gutenberg and LibriVox come from the numbers Open Library already records
  (id_project_gutenberg, id_librivox), not from Gutendex (60–90+ seconds per search) or LibriVox's API (doesn't allow
  web pages; its script format would run LibriVox code inside Reading Room). Standard Ebooks' feeds need a paid
  Patrons Circle membership, so search links only, as the hand-off says.
- **Language setting** (James agreed Oct 31; do it at the very end): Open Library lookups prefer English editions, fixed in code. Add a
  member setting (for example Spanish) that sets the preferred edition language. The same setting should set Google Books' country
  (`GB_COUNTRY`, fixed to US for now).
- **Did Not Finish reasons** (James, Oct 31): the list is fine for now (Not for me, Too slow, Not the right time,
  Content I didn't want, Had to return it); revisit later. Possible later use: "Not for me" as a soft Not for Me
  for that author in Discover.
