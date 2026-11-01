# Reading Room — Book Descriptions (Next Session)

Nov 1, 2026 · @James

## What this adds

Every book's details form gets a description of the book, so members can tell what a book is about before adding it, borrowing it, or starting it. Discover especially needs this: a reason line says why a book is suggested, but not what it is.

Everything stays inside the existing book details form. **No new page.** Size: M.

It depends on Discover release 1's step 2a: each title must have its Open Library **work key** saved, because descriptions live on the work record, not in search results.

## In the book details form

**About tab.** Add **About** as the first tab: About · Copies · My Reading · Emberton Family Activity · Notes. It switches content like the other tabs; no second form is layered on top.

**Preview under the title.** Below the genre and page count ("Memoir · 334 pages"), show the first two lines of the description, ending in **More**. Tapping More switches to the About tab. No preview when there's no description.

**Which tab opens first.**

| Opened from | First tab |
| --- | --- |
| Discover, Find a Book, Recommendations | About |
| Library (Group Library, My Books) | Copies, as now |

About is never empty: it always shows at least the facts line.

## Sources, in order

Use the first source that has a description.

| Order | Source | How it's fetched | Saved? |
| --- | --- | --- | --- |
| 1 | Member-written | Typed in Edit Book | Yes, on the title |
| 2 | Open Library work record | Fetched with the work key by the background lookup, and by Find a Book for new books | Yes, on the title |
| 3 | Google Books | Fetched only when a member opens the book's details and steps 1–2 have nothing | **Never saved** |

**Member-written descriptions** come first because a member chose to write them. Edit Book gets an optional **Description** field. Members who can edit the book can add or change it.

**Open Library** needs no key and its data is public domain. Fetch the description once per title alongside the work key, author key, and ebook availability (step 2a).

**Google Books** fills gaps. Its terms require:

- Google attribution and a prominent link to the book on Google Books wherever its text is shown;
- the text shown unaltered (cleanup limited to formatting; see Display rules);
- no stored copies. Fetch on demand, keep it in memory for the open form only.

Read Google's current Books API terms and branding guidelines before building this part. A free API key may be needed.

## Display rules

**About tab layout, top to bottom:**

1. The description, collapsed to about 4 lines, with **Show More** / **Show Less**. Keep the original paragraph breaks.
2. The source line, in small text (see below).
3. The facts line: "Published 2018 · About 334 pages". Year only, since Open Library gives a first-publish year. "About" because the page count is a median across editions.

**Source line wording** (sentence case):

| Source | Line |
| --- | --- |
| Member-written | "Description by Josh" |
| Open Library | "Description from Open Library" |
| Google Books | "Description from Google Books" plus Google's required attribution and link |

**Cleaning Open Library text before saving.** Remove source links, "See also" lines, divider lines, and Markdown link syntax. Keep paragraph breaks. Discard a description that's only a few words or only a source credit.

**No description.** The About tab shows only the facts line, and members who can edit the book see an **Add a Description** link that opens Edit Book at the Description field. No "No description available" message.

**Kept collapsed on purpose.** Publisher descriptions are marketing copy, and later books in a series can spoil earlier ones. Members read the full text only when they choose to.

## Checks, open items, and out of scope

**Checks before or during the build**

- [ ] Confirm the Open Library work record's description field and its formats (plain text or an object with a value).
- [ ] Read Google Books' current terms and branding guidelines; confirm attribution, linking, and the no-storage rule.
- [ ] Coverage test: check 20 of the family's books against Open Library and Google Books, and note how many get a description from each.
- [ ] Optional: compare two Pagebound descriptions (ACOTAR book 6, Howards End) with both sources to see where Pagebound's text comes from.

**Open items for James**

- [ ] Confirm Google Books is included from the start (assumed here).
- [ ] Title capitalization: show titles as saved (some Open Library titles are in sentence case, such as "Adventures in the screen trade"), or format them in title case for display only.

**Out of scope**

- Synopses on Discover cards. Tapping a cover or title opens the book details form instead.
- Wikipedia summaries (plot sections often give away endings).
- AI-written synopses (cost money and can be wrong).
