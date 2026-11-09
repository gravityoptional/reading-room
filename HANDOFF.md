# Reading Room: Where Everything Is

Handoff from the Discover build session to the RC session · November 4, 2026

*Reading Room* is a placeholder name. The app is one file, `index.html` (vanilla JavaScript, HTML, and CSS, no build
step), published with GitHub Pages.

## The test site

| Site | Address | Label | Branch | Purpose |
|---|---|---|---|---|
| **Beta** (test copy) | https://gravityoptional.github.io/reading-room/ | yellow BETA | `main` | The prototype with sample data. New work is built and tested here first. |
| **Live beta** | https://reading-ember.pages.dev | — | `gravityoptional/reading-room-live` | Members' real site, built from this repo's `main` by `tools/build_live.py`. |

- **Alpha was retired Nov 9, 2026** (James: testers moved to the live beta). `/beta/` now forwards to the site
  address, and the site keeps Beta's label and saved data (`rr-next-…` names). The `next` branch is no longer used.
- Publishing: any push to `main` runs `.github/workflows/pages.yml`.

## How work flows

1. Build and test on `main` (the test copy).
2. Show James phone and desktop previews, and ask before pushing anything.
3. Move to the live site (reading-room-live) only with James's approval.

## Repositories

| Repository | Visibility | What's in it |
|---|---|---|
| `gravityoptional/reading-room` | your repo | The app. Branches: `main` (the test copy); `next` (former Beta) is retired. Older branches `fix/mobile-current-cover` and `open-library-search` are from earlier work and aren't used. |
| `gravityoptional/reading-room-chatgpt` | public | ChatGPT's copy, used for trying appearance ideas cheaply. Its own site: https://gravityoptional.github.io/reading-room-chatgpt/ (blue ChatGPT label, its own `rr-chatgpt-*` saved data). Nothing flows between it and this repo automatically. |
| `gravityoptional/reading-room-notes` | private | Packaged sessions: the original Main session, and (when packaged) this one as **Discover Build Prototype - Reading Room**. |

## Files in `gravityoptional/reading-room`

| File | What it is |
|---|---|
| `index.html` | The whole app. |
| `LATER.md` | The merge log between Beta and Alpha. Plans, decisions, and items saved for later are in the Requirements doc (Build plan and Later) in `reading-room-notes`. |
| `HANDOFF.md` | This file. |
| `plans/Book_Descriptions.md` | James's plan for book descriptions (built Nov 2). |
| `tools/tapcount.js` | Tap-count regression: 10 core tasks, before vs. after. Usage is in the file. |
| `.github/workflows/pages.yml` | Publishing for both sites. |
| `README.md`, `_config.yml` | Repository basics. |

## Saved data (browser storage)

Every site under gravityoptional.github.io shares one browser origin, so each site keeps its own storage names. Never
mix them.

| Site | Names |
|---|---|
| Alpha | `rr-editorial-proto-v1`, `rr_editorial_hero_v1`, `rr_drafts_v1`, `rr-disc-v1` |
| Beta | `rr-next-v1`, `rr_next_hero_v1`, `rr_next_drafts_v1`, `rr-next-disc-v1` (the test bed's names, kept for continuity) |
| ChatGPT copy | `rr-chatgpt-v1`, `rr_chatgpt_hero_v1`, `rr_chatgpt_drafts_v1`, `rr-chatgpt-disc-v1` |

Alpha carry-over: the first time Alpha opens in a browser that has Beta's data, it copies that data over once. The
old Alpha data is kept as `…-before-alpha`, and the flag `rr-alpha-carried` stops it from copying again.

## Outside services

- **Open Library:** covers, book matching, descriptions, and free-source links (Gutenberg and LibriVox numbers). It's
  free and keeps no account. It's sometimes slow or busy, so lookups run in the background.
- **Google Books:** descriptions only. They're fetched when a book opens, shown with Google's attribution, and never
  saved. The key `GB_KEY` is in `index.html`, published at James's instruction, and Google restricts it to
  gravityoptional.github.io and the Books API. Moving it behind a Cloudflare Worker is on the live-beta list.
- **WorldCat** ("Find at Your Library") and the Standard Ebooks / Gutenberg / LibriVox links are plain links.

## Syncing ChatGPT's copy

The copy can be brought up to date with one file swap:
1. Take Beta's `index.html`.
2. Replace the **`BETA` identity block** (near "Alpha (the site address) and Beta…") with the copy's identity: the
   ChatGPT title and tag, `KEY='rr-chatgpt-v1'`, and the `rr_chatgpt_*` / `rr-chatgpt-*` names for `HERO_KEY`,
   `DISC_KEY`, and `DRAFT_KEY`.
3. Add `.gpt-tag{background:#2563EB!important}`.
4. Check that no `rr-next`, `rr-editorial`, `rr-disc-v1`, or `rr_drafts_v1` names remain.
5. James applies it there through a pull request.

The last sync package predates the genre box and the Alpha/Beta switch.

## Standing checks after every change

- **Scroll arrows:** text fields, selects, and small panels at 320, 390, and 1280 px, in light and dark. (James asked
  for this specifically.)
- No page errors. Tap count unchanged, or changes explained.
- Contrast of 4.5:1 for new colors.
- Phone and desktop previews before publishing.

## What lived only in this session's machine

These were never in the repository. Include them in the session package if they should be kept:
- `handoff/Reading_Room___Build_Hand-off_for_Claude_Code.md`: the original build hand-off (sections 1–3).
- `handoff/chatgpt-sync/`: the last sync package.
- `previews/`: screenshots and contact sheets (about 81 MB).
- The browser test scripts used for every check (scroll arrows, contrast on all palettes, note prompts, genre box,
  sharing prompts, and others). They take a folder as their argument.

## Open items

- **Phase 3, live beta:** choose the first administrator method; set up Supabase and Cloudflare; Goodreads import
  (with the import sharing prompt already designed in the Requirements doc); Download and Restore; Send Feedback and a
  content-removal contact (needed for Google Books terms); possibly move the Google key behind a Cloudflare Worker.
- **Later:** Open Library genre suggestions (designed, not built); language setting (at the very end); Adjust
  Dashboard Photo; premade challenges; revisit Did Not Finish reasons; watch WorldCat's Error 1015; Discover
  release 2 (January).
