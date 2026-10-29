# Reading Room — Requirements

Oct 27, 2026 · @James

## Purpose and principles

Reading Room is a private reading site for individuals and small groups: a family, friends, or a book club. Every member has their own reading room, and a group shares a library, challenges, Battle of the Books, and activity. It began as a family project for James's family of seven, which is the first group and the test case. The aim is to encourage reading. The guiding line from the original workbook still applies: a reading tracker that rewards reading, not list-making.

Mission: prioritize reading and remove friction in logging and meeting goals, while keeping Reading Room visually appealing. Every screen should remove friction rather than add it. Options stay visible instead of being hidden behind "More" links. Reading Room does the bookkeeping so the reader doesn't have to: a member chooses a book, reads or listens, and records what they did, and progress, goals, streaks, challenges, history, and achievements update automatically. Every new feature must pass one of two tests: it helps someone pick up a book or log reading, or it makes progress visible without asking anyone to do more work. Design principles agreed so far:

1. **Usability first, visual polish second.** The shared website comes first. The immersive "cozy home library" personal view comes later.
2. **Minimal data entry.** Logging a session takes seconds, and the starting page fills in automatically. A reading timer records minutes so nobody has to watch the clock, and saving shows progress toward the goal as a small reward.
3. **Enter information once.** One book record serves the library, reading lists, history, and challenges.
4. **Progress is immediately visible.** Progress toward a goal is the main motivator, so it leads the dashboard.
5. **Mobile-first.** Everything important works comfortably on a phone.
6. **Personal by default, shared by choice.** Each member controls what their groups see.
7. **Recorded and estimated data stay separate.** Estimates are always labeled.
8. **Encourage, don't rank.** Reward consistency as much as volume, and keep competition optional.

**Division of work.** ChatGPT handles layout, visual design, and user experience. Claude handles code, data, and hosting setup. The existing Claude HTML app is the functional starting point, not something to rebuild. The Excel workbook remains the reference for calculations.

## Hosting and architecture

The recommended setup is Cloudflare Pages for the website and Supabase for accounts, data, and file storage, both on free tiers to start. Members visit a web address and sign in, with no Excel or claude.ai account needed.

| Piece | Service | What it does |
| --- | --- | --- |
| Website | Cloudflare Pages | Hosts the pages and app code; deploys from GitHub |
| Accounts | Supabase Auth | Invitation emails, sign-in, password resets |
| Data | Supabase Postgres | Books, copies, reading sessions, goals, challenges, trophies, reactions |
| Files | Supabase Storage | Profile pictures, uploaded covers, trophy artwork |
| Book lookup | Open Library (free) | Title, author, and ISBN search with automatic covers |
| Code | GitHub | Holds the code; pushing changes updates the site |

To keep opening the site effortless, members stay signed in and can add Reading Room to their phone's home screen like an app. Setup by James: free accounts with GitHub, Cloudflare, and Supabase. Claude provides the code and walks through each setup step. A custom domain is optional and costs roughly $10–15 a year.

Known limit: Supabase pauses free projects after about a week with no activity. Daily use should prevent that, and the JSON backup and export feature stays in the app as a safety net.

**Core data model.** These separations carry the design decisions:

- **Title:** one catalog record per book (title, author, ISBN, cover, page count).
- **Copy:** a format someone owns (physical, ebook, or audiobook), with owner, location or platform, and loan status.
- **Reading:** one person's read-through of a title, with status, start and finish dates, and rating. A reread is a new reading.
- **Session:** one logged sitting, with date, pages, and minutes. Every statistic, goal, streak, and challenge is calculated from sessions, so new achievements can be added later without anyone re-entering data.
- **Groups, members, and roles:** profiles, privacy setting, and administrator flag. The database is built around groups from the start: a family is one kind of group, a person can belong to several groups, and reading always belongs to the person, never to a group.

## Accounts, privacy, and notifications

Access is by invitation only, and the site is private and not publicly searchable; open sign-up comes only if the site ever goes public. Individuals and groups: everything works for a solo reader (goals, timer, My Books, History, Records, personal challenges, and the Trophy Wall need no group), and group features appear only once someone belongs to a group. A person can belong to several groups, such as a family, friends, and a book club, and moves between them with a group switcher. Each group has its own invitations, administrators, Library, challenges, Battle of the Books, and activity. Privacy is set per group, and reading logged once counts everywhere it applies. Group size is limited at first, with room to grow later.

**Accounts**

1. An administrator sends an email invitation with a secure link that expires.
2. The invited member sets a password, and their dashboard and collection are created automatically.
3. Administrators can resend invitations, deactivate accounts, and revoke access. More than one administrator is allowed.
4. Profiles include a display name, a profile picture (with a default avatar), an email address, the privacy setting, and a role (Member or Group Administrator, set per group). Members edit their own profiles.

**Privacy.** Each member has one setting: *Share with My Groups* or *Keep My Activity Private*. Sharing shows currently reading, finished books, reading progress, and achievements. New accounts start private. Group Activity only shows members who have switched to sharing, so onboarding should point out the setting.

| Information | Who can see it |
| --- | --- |
| Group Library and book ownership | Everyone |
| Battle of the Books reading list | Everyone |
| Challenge participation and progress | Fellow participants |
| Currently reading, finished books, streaks, achievements | Depends on the member's setting |
| Detailed reading logs | The member only |
| Personal notes and ratings | The member only |

**Notifications.** The first version shows notifications on the site only, in the upper-right bell. Notifications cover new group challenges, Battle of the Books invitations, group achievements, and reactions. Members can dismiss them, and there are no unnecessary reminders. Email is used only for invitations and password resets; optional email notifications can come later.

## Navigation and visual style

The site has four primary sections. They appear in a top bar on desktop and a bottom bar on phones. Notifications and the account menu sit in the upper-right corner.

| Section | What lives there |
| --- | --- |
| Dashboard | Daily goal, Log Reading, Currently Reading, Paused Books, My Challenges, Recent Trophies, Group Activity (when in a group) |
| Library | Three tabs: Group Library, shown with the group's name (what the group owns), My Books (every book connected to you, with status filters for Currently Reading, Paused, To Read, Finished, Did Not Finish, and Own but Not Started), and Recommendations (To Me and From Me). Search, filters, sort, Grid and Shelf views, Add a Book |
| Challenges | My Challenges, Group Challenges, Battle of the Books, Trophy Wall |
| History | Your reading over time: This Year statistics, a monthly calendar, Reading Sessions, and Rereads (book shelves live in My Books) |

**Visual style: Warm & Modern** in an editorial layout (decided Oct 29, 2026, from the Editorial Prototype). Pages read like a well-designed magazine: cream backgrounds, restrained sage-green accents, serif headings, and sections separated by white space and thin warm dividers instead of boxes, with plenty of room for book covers. Cards are kept where they help, such as challenge cards and dialogs. Tabs are underlined rather than pill buttons. The dashboard opens with a hero the width of the page content: greeting, today's goal ring, streak and week dots, Log Reading and Start Timer, over a soft scene or a photo the member adds. Below it, Currently Reading leads (with the first book in the Reading Queue beside the thumbnails), then Paused Books and the Reading Queue, then My Challenges and Recent Trophies, with Group Activity and the monthly calendar in a right-hand column. The Library's Shelf view is a wooden bookcase with brass bookends marking each section and some books stacked flat. No quotes appear on the dashboard. It avoids the traditional parchment-and-forest-green library look (option C). The site supports light and dark modes.

Capitalization: title case for short labels (headings, navigation, tabs, buttons, field labels, menu choices), for example "Mark Finished," "Start Timer," and "Sessions to Go." Sentence case for anything that reads as a sentence (messages, hints, help text, descriptions, checkbox and radio options). Small words (a, an, the, and, or, of, to, in, on, at, by, for, with) stay lowercase unless they come first. Book titles stay as published.

## Dashboard, reading log, and goals

Each member gets a personal dashboard, not a shared group homepage. It answers three questions: what am I reading, how close am I to my goals, and what should I do next.

**Dashboard order, top to bottom**

1. Today's goal progress and current streak, with **Log Reading** as the most prominent button.
2. Currently Reading, with no limit on the number of books. Each book shows its cover, progress bar, page or audiobook position, last read date, and its own Log Reading button. Books sit side by side on desktop and in a scrolling row on phones, with View All when there are many.
3. Paused Books, a small section with one-click Resume.
4. Next-milestone hint, such as "25 pages to reach 350."
5. My Challenges progress and Recent Trophies.
6. Secondary statistics, including finish-date estimates and the calendar.
7. Group Activity with reactions, shown only when the member is in a group (see Challenges and trophies).

**Log Reading rules**

| Field | Required? |
| --- | --- |
| Book | Yes |
| Date | Yes; defaults to today |
| Starting and ending page | Optional, entered as a pair; the starting page fills in from the last session |
| Minutes | Optional |
| Pages or minutes | At least one |

Log Reading is one form for every session, with no Pages, Time, or Audiobook tabs. The Log Pages, Log Time, and Log Audiobook shortcuts open the same form with the matching field focused. Starting page, ending page, and minutes sit together, and a Status field lets the reader pause, finish, or drop a book from the same form. Pages read is the ending page minus the starting page, and the starting page is the last session's ending page, so back-to-back sessions never count a page twice. Audiobooks show start and end positions (h:mm) in place of pages. The form calculates pages read, speed, and goal progress as you type. Reaching the final page offers to mark the book Finished.

- **Pages only:** updates book progress, percent complete, and finish estimate. It counts as an active reading day.
- **Minutes only:** updates reading time, the daily goal, and time-based achievements. It counts as an active reading day.
- **Both:** updates everything, including reading speed.
- **Estimated time:** if pages are logged without minutes and the reader has enough history, time is estimated from their pace on that book, or their overall pace if the book has too little history. An estimate can count toward a minutes goal and is always labeled as estimated. Without enough history, the session counts only as an active reading day.

**Daily goals.** Each member chooses minutes, pages, or both (the default is 20 minutes). With both selected, meeting either goal counts as a successful day. There are three outcomes:

- **Active reading day:** something was logged.
- **Goal achieved:** a goal was met.
- **Both goals achieved:** a bonus accomplishment.

Streaks continue on any active reading day. Each member chooses 0, 1, or 2 rest days per week (default 1); a missed day uses a rest day instead of breaking the streak. Weekly consistency goals, such as reading 4 of 7 days, soften the sting of a missed day.

**Reading statuses**

| Status | Behavior |
| --- | --- |
| Want to Read | Saved for later; this is the To Read shelf |
| Currently Reading | On the dashboard with progress and quick logging |
| Paused | Progress is kept, and the book moves to Paused Books |
| Finished | Records the finish date and adds the book to the Finished Shelf |
| Did Not Finish | Keeps the reading history, and the book is no longer active |

Rereads create a new reading of the same title, with its own dates, progress, and sessions.

## Group Library, adding books, and recommendations

Each group's Library is one shared catalog of titles, shown with the group's name (for example "Emberton Family Library" or "Tuesday Book Club Library"). Each title can have several copies owned by different members. A member's books appear in the Library of every group they belong to, and they can exclude individual books from a group. It covers physical books, ebooks, and audiobooks. A hardcover and an audiobook of the same book appear under one title.

| Format | Tracked |
| --- | --- |
| Physical | Owner, location, availability, borrower |
| Ebook | Owner, format, reading platform |
| Audiobook | Owner, listening platform, duration |

The library shows a visual grid of covers, with search by title, author, or owner. It filters by All, Available, Borrowed, and My Collection, plus author and genre. Anyone can add a title to their own To Read list without owning a copy.

**Permissions**

| Action | Who |
| --- | --- |
| Browse the Group Library | Everyone |
| Add, edit, or remove copies | The copy's owner |
| Mark a physical copy loaned or returned | The copy's owner |
| Add to a personal reading list; record progress and ratings | Each reader, for themselves |
| Correct shared catalog details | Administrators |

The first version shows only ownership and availability. A **Request to Borrow** button that notifies the owner for approval is planned for later.

**Adding books**

1. **Find a Book (default):** search Open Library by title, author, or ISBN, then pick a match to fill in the details and cover.
2. **Manual entry:** for books lookup can't find, or to correct details. Covers can be uploaded.
3. **Import:** CSV and Excel files, plus Goodreads and StoryGraph exports where their formats allow. Import shows a preview, maps fields, checks for duplicates, and offers skip or update for existing records. Imports can be repeated without creating duplicates. Missing fields stay blank rather than being guessed.

Import offers two types, separately or together:

- **Book Collection:** titles, authors, ISBNs, editions, formats, ownership, and availability.
- **Reading History:** status, start and finish dates, ratings, progress, and sessions where available. Importing a reading history never adds those books to a group's owned collection.

**Recommendations (not yet designed with ChatGPT).** James listed book recommendations under the Library. The proposed design adds a **Recommend to…** button on any book: pick a group member and add an optional note. The recipient's Library gets a **Recommended to Me** shelf showing the book, who recommended it, and the note, with Add to To Read and Dismiss. Recommendations would also appear in Group Activity and could earn a trophy, such as "Read 5 recommended books."

## Challenges, Battle of the Books, trophies, and Group Activity

Any member can create a challenge, and joining is always voluntary. A challenge can be open to the whole group or sent as a direct invitation to specific members, for example a parent challenging a child to read a particular book. Invited members get a notification and can accept or decline. Progress comes from regular reading logs, so nothing is entered twice.

**Challenge types**

- **Personal challenges:** goals beyond the daily target, such as 12 books this year, 1,000 pages this month, a series, or 30 days in a row.
- **Cooperative group challenges:** everyone adds to one shared total, such as 100 group reading hours, with a bar showing each person's contribution (shared members only).
- **Friendly competitions:** optional, with set dates. Scoring rewards consistency, goal completion, or improvement on one's own baseline, never raw book counts by default.

Challenge types: Books, Pages, Reading Time, Reading Days, and Book List (a set list of titles, optionally with a deadline). Every challenge uses one universal contribution system. An automatic rule counts matching reading (all reading, books by an author, books in a genre, or nothing), optionally including reading from before the start date. Members can also use Add Progress to include specific finished books, reading sessions, or reading days from any date, and Remove any item, automatic or added, with Restore available. Contributions only reference existing reading; they never copy or change reading history, and one reading can count toward several challenges. This supports curated challenges like "Books by Women" or "Days on Vacation." Accomplishments outside the app are handled as hand-given awards on the Trophy Wall. Competitions are scored by Reading Days or Goal Days (days a member meets their own daily goal), so slower readers aren't disadvantaged. Group challenge cards show who started them and a visible Join or Joined state, and details include Leave Challenge. Each Battle of the Books has a reading start date and an event date, and its status follows them automatically: Upcoming, Active, then Completed. The creator can edit a challenge, with safeguards once people have joined. Finishing a challenge awards a trophy and posts to Group Activity.

**Battle of the Books (available to any group).** The battle is held in person; the website only organizes it.

| Feature | Behavior |
| --- | --- |
| Create | Any member: name, description, event date |
| Status | Upcoming, Active, or Completed |
| Roles | Reading participants (typically 6) and one non-reading moderator |
| Book selection | Each participant adds one or more books; a book already on the list can't be added again; the moderator adds none |
| Shared reading list | One list per battle; every participant reads every book |
| Progress | Each participant's progress through the whole list, shown together |
| History | Past battles and their lists stay available |

The battle page shows who is participating, which books are on the list, and how far each person has read. The first version has no question tracking, quizzes, scoring, or winners.

**Trophy Wall.** The Trophy Wall is kept and appears as its own tab under Challenges, with a Recent Trophies preview on the Dashboard. Each member has their own wall, and their privacy setting controls who sees it.

- **Badges** mark reading milestones, such as a first book or a 7-day streak.
- **Medals** mark completed personal goals and challenges.
- **Trophies** mark major accomplishments, group challenges, and special awards.
- Locked achievements appear as subdued silhouettes, and earned ones show their name, description, and date.
- Achievements can recur, so steady readers keep earning recognition even between finished books. Records such as longest book and fastest finish carry over.
- Custom awards can be given manually, for example for a school reading competition.
- Artwork uses simple placeholder illustrations first. A small reusable set of badges, medals, and trophies can replace them later without redesigning the wall.

**Group Activity.** This is a compact feed near the bottom of the dashboard, shown only to members of a group; solo readers never see it. It shows finished books, newly started books, goals reached, challenges joined or completed, and trophies earned, but only for members who share. Rankings stay in Challenges, not the feed.

The feed has four reactions: Like, Love, Celebrate, and Applaud. Each person can leave one reaction per item and can change or remove it. Counts are shown, and the recipient gets a notification. There are no comments or messages in the first version.

## History and statistics

Statistics stay simple in the first version. Statistics are personal by default and shared only through the privacy setting.

- **History tabs:** Finished Shelf (visual, browsable), Reading Sessions (the full log), Simple Statistics, and Rereads.
- **Simple statistics (this year):** books finished, unique books, reading time, current streak, pages read, daily goal progress, and completed challenges. Estimated time is shown separately from recorded time.
- **Later:** a monthly reading calendar, year-over-year comparisons, time versus pages, genre and format breakdowns, and richer charts. Because every session is stored as its own record, these can be added later from data already collected.

## Starting point: the Editorial Prototype

Work starts from the Editorial Prototype: a single HTML file, `index.html` (about 300 kB), in the [gravityoptional/reading-room](https://github.com/gravityoptional/reading-room) repository on GitHub. GitHub Pages publishes it at https://gravityoptional.github.io/reading-room/, and every push to `main` updates the site. All saving and loading goes through one storage layer, which for now keeps each person's data in their own browser; that layer is what Supabase replaces. Most screens and logic carry over.

| Area | Status | Work |
| --- | --- | --- |
| Sessions with pages, minutes, and speed | Keep | Allow pages-only or minutes-only; fill in the starting page; add estimated time |
| Daily goal, streaks, finish estimates | Keep | Per-member goal type; either-goal rule; weekly consistency |
| To Read, Reading, Finished, Finished Shelf | Keep | Add Paused, Did Not Finish, multiple current books, rereads |
| Trophy Wall and custom trophies | Keep | Move under Challenges; add Recent Trophies, badge/medal/trophy tiers, recurring awards |
| Library shelves | Change | Split into titles and owned copies; add formats, search, filters, loans |
| Book lookup | Done | Find a Book searches Open Library by title, author, or ISBN and fills in the cover, page count, and publication year; Add It Yourself covers books it can't find |
| Storage and sign-in | Replace | Browser storage becomes Supabase auth, database, and storage |
| Navigation and look | Change | Four-section top or bottom navigation; Warm & Modern palette |
| Backup and export | Keep | Also serves as a migration path |
| Accounts, invitations, privacy, admin | New |  |
| Import (collection and history) | New |  |
| Group Activity and reactions | New |  |
| Challenges and Battle of the Books | New |  |
| Recommended to Me | New |  |
| Notifications | New |  |

James's existing library moves over through the app's JSON backup or the Excel/Goodreads import.

## Open decisions and future versions

**Open decisions**

- [ ] **Default privacy for new accounts.** Decided: private. Members can switch to Share with My Groups at any time.
- [ ] **Recommendations.** Approve or adjust the Recommended to Me design in the Group Library section.
- [ ] **Exact colors and fonts.** Decided: the first ChatGPT palette. Light mode uses background #FAF7EE, primary #2E7D52, text #1F2937, accent orange #F97316, a warm tan border #E6DCC6, and warm off-white surfaces and cards #FDFAF0 (both chosen over the palette sheet's light gray and pure white because they suit the cream background). Dark mode uses background #0F172A, primary #34D399, and accent orange #FB923C. Body text is Inter, and headings use a serif to match the mockups.
- [ ] **Statistics.** Decided: simple at first.
- [ ] **Domain.** Use the free Cloudflare address or buy a custom domain.
- [ ] **Administrators.** Decide who besides James holds the admin role.
- [ ] **Scope.** Decided: Reading Room serves individuals and small groups (families, friends, book clubs). Sign-up is by invitation at first; open sign-up only if the site goes public. A member's books show in every group they belong to, with the option to exclude books. Group size is limited at first, with room to expand later.

**Future versions**

- Request to Borrow, with owner approval.
- Battle of the Books: assigned reading lists, online quizzes, scoring, and results.
- Optional email notifications.
- Detailed statistics and charts.
- **Year in Review:** a December summary of books, pages, favorite month, and longest streak, built from existing data.
- Prompt-based challenges, such as "a book from before 1900."
- A Suggest My Next Read panel.
- Distinctive trophy artwork.
- The immersive personal "cozy home library" view, which members can choose as their appearance.
- **Personal color palettes.** Each member picks a palette in their profile, starting with 6 to 8 options: Sage (default), Ocean Blue, Rose, Lavender, Meadow Green and Tan, Slate, Plum, and Amber. Every palette has a light and a dark version, and palette and Appearance (System, Light, Dark) stay separate choices. Palettes change only accent colors, the goal ring, progress bars, and the background tint; streak orange, error red, trophy colors, and book covers stay fixed. Each member's palette color can also become their avatar color in Group Activity and challenges. Every version must pass contrast checks.
- **Profile pictures and banners to choose from.** A gallery of profile pictures to pick from, alongside uploading your own, and a choice of banner images for the top of the dashboard.
- **Groups for friends and book clubs.** Moved into the core requirements (see Accounts, privacy, and notifications).
- **Someday, for dreaming:** classrooms and school reading clubs (teacher-managed accounts, parental consent, and a student-privacy review), and public groups anyone can join (reporting, blocking, moderation, and a privacy policy).

**Must-haves before the real beta**

- [ ] **Parent-managed profiles for young readers:** a profile with no email or phone needed, which a parent can log reading for from their own account.
- [ ] **Send Feedback** link in the account menu.
- [ ] **Import and export:** bring in the original Reading Room data, the Excel workbook, or a Goodreads export, and let anyone download their own data.
- [x] **Edit and delete reading sessions** (built: tap Edit on any session in History; everything recalculates).

**Added for the design beta:** Records in History (longest book, fastest finish, best reading pace, longest session, most pages in a day, most books in a year, longest streak); Reading Queue (formerly Up Next), an ordered list of up to 10 To Read books shown on the dashboard, at the top of To Read, and first in Start a New Book, with the first book also shown in Currently Reading as "Next in your queue"; Reading Together, where one logged session also credits the group members chosen; and half-star ratings.

## Cleanup list for the next session

Noted Oct 29, 2026, from the Editorial Prototype review.

- [ ] Look at font options. (Heading Font and Body Font pickers are in the account menu to try them; pick the final pair.)
- [x] Remove the book icon next to the site name until a new name and logo are decided.
- [x] Add the palette selector to the account menu beside Appearance.
- [x] Restore warm off-white surfaces (#FDFAF0) for dialogs, buttons, search bars, challenge cards, trophies, and Recommendations From Me; they turned stark white when surfaces were matched to the palette sheet. Record the choice under colors.
- [x] Recommendations: let the recommender edit or remove a note, or withdraw the recommendation (today's Remove takes the book out of the library instead); allow only one recommendation of a book to the same person.
- [x] Recommendations To Me: let the recipient dismiss or set one aside quietly, without notifying the recommender.
- [x] Let members add books to My Books without adding them to a group; sharing a book with a group is optional.
- [x] Fix the stray up/down scrollbar arrows beside the Library and Challenges tabs (a layout bug from the underlined tabs).
- [x] Make page headers consistent: either give Library, Challenges, and History the same hero treatment as the Dashboard, or remove the Library banner placeholder.
- [x] Challenge invitations: add direct invites to specific members, with a notification to accept or decline.
- [ ] Revisit "Next in your queue" wording in Currently Reading.

* [x] Expand Group Activity so everything a sharing member does shows (ratings, notes, Did Not Finish, and pausing stay private). Combine routine items ("Josh logged 3 sessions today") and let each member hide types they don't want.
  - Reading: started a book, finished a book, started a reread, picked up a paused book again, reached halfway, logged a session, read together.
  - Library: added a book to the group library, added a format, loaned a book, got a book back, recommended a book.
  - Goals and streaks: met today's goal, met both goals, streak milestones (7, 30, 100, 365 days), perfect week, new personal record.
  - Challenges: created, invited someone, joined or accepted, reached halfway, completed, group finished a shared challenge.
  - Battle of the Books: created, joined as reader or moderator, finished the whole list, started, completed, champion announced.
  - Trophy Wall: earned a named badge, medal, or trophy; received an award; gave an award.
  - Group: a new member joined.
* [x] Expand achievements (no rankings, per Encourage, don't rank).
  - Badges: 1, 5, 10, 25 books; 1,000, 5,000, 10,000 pages; 10 and 50 hours; 3, 7, 14-day streaks; First Goal Met, First Reread, First Audiobook, Quick Read (finished in a day), Comeback (reading again after two weeks off).
  - Medals: 50 and 250 books; 25,000 and 100,000 pages; 100 and 500 hours; 30, 60, 100-day streaks; Perfect Week, Perfect Month, Double Goal; Genre Explorer (5 genres), Format Explorer (print, ebook, audiobook); Doorstopper (800+ pages), Series Finisher, Queue Clearer (5 books from the Reading Queue), To Read Rescue (started a book on To Read for a year).
  - Trophies: Century Reader (100 books), 500 Books, 1,000,000 Pages, 1,000 Hours, 365-Day Streak, Every Month (read in all 12 months), Beat Last Year, Challenge Champion (5 completed), Battle of the Books Champion.
  - Social: Read Together (1 and 10 times), Took a Recommendation, Good Recommender, Lender (5 loans), Librarian (25 books added to a group library), Cheerleader (25 reactions), Team Player, Challenge Accepted, Battle Reader, Finished the Battle List, Battle Moderator.
  - Awards given by people: custom awards plus ready-made ones such as Most Improved, Great Reading Partner, and Kept Going.
  - The Excel workbook already has many of these tiers (streaks to 365, pages to 1 million, hours to 10,000, Perfect Week, To Read Rescue).

- [x] Book editor: Move To buttons (Currently Reading, Paused, To Read, Reading Queue, Finished, Did Not Finish) for any book. Logged reading stays in History; a book with nothing logged moves without a trace. Also reachable from Change Status or Details in a book's My Reading tab.
- [ ] Still to build from the activity list: perfect week, new personal records, challenge halfway, battle started and completed (date-based), new member joined.
- [ ] Achievements: Series Finisher, Queue Clearer, and To Read Rescue are built. Series name, book number, and series length are set in the book editor (Silo is pre-filled); books started from the Reading Queue are flagged from now on; the date a book goes on To Read is saved from now on, and the Goodreads Date Added column should fill it in on import. Still open: Format Explorer counts print and audiobook only until ebook readings are tracked separately.
