# Homework Practice Hub

A simple, no-build website where the kids practice school assignments.
It's plain HTML/CSS/JavaScript hosted on GitHub Pages, so there's nothing
to install — you just edit files and push.

## The big idea: engines + content

Instead of one big file per game, the site is split into two parts:

- **Engines** (in `engines/`) — the *games* themselves. Written once, you
  rarely touch these. Each engine works for any subject.
  - `engines/vocab/`  — read a definition, pick the matching word.
  - `engines/speak/`  — a word appears, the child says it out loud and the
    browser checks it (needs Chrome or Safari + a microphone).
  - `engines/math/`   — a practice test built to look like the real online
    test: tap ▶ to hear the question read aloud and answer, with scratch
    paper beside the question. Nothing is marked until he taps Submit.
- **Content** (in `data/sets/`) — the *material* for one assignment, e.g. a
  word list or a set of definitions. These are tiny files you edit often.

The home page is built automatically from **`data/manifest.js`**, which lists
each kid, their subjects, and which activities show up.

## How to add a new assignment

1. **Make a content file.** Copy an existing file in `data/sets/` and rename
   it (use only lowercase letters, numbers, and dashes), then edit the words.
   - For a vocab quiz, copy `data/sets/evan-vocab-3.js`.
   - For a say-the-word game, copy `data/sets/eli-sight-words.js`.
   - For a math practice test, copy `data/sets/evan-math-topic3.js`, which
     has a worked example of every question type.
2. **List it in `data/manifest.js`.** Add an entry under the right kid/subject:
   ```js
   { set: "your-file-name", title: "What kids see", engine: "vocab", added: "2026-10-15" }
   ```
   (`engine` is `"vocab"`, `"speak"`, or `"math"`. `added` is the day you
   added it — see **The NEW badge** below.)
3. Save, commit, push, and merge into `main`. It appears on the home screen
   automatically — see **Publishing** below for why the merge matters.

To retire an assignment, add `archived: true` to its line in
`data/manifest.js`. The tile leaves the home screen, but the content file and
the kid's scores stay put — delete those two words to bring it back. (Key
Literacy Terms 3 and 4, Topic 3 and Multiply & Estimate are archived this way.) A subject with no activities
shows "Coming soon" — that's why **Eli's Math** is a placeholder right now.

## The NEW badge

A tile wears a gold **NEW** badge for **14 days** after the `added` date in
`data/manifest.js`, so the kids can spot what just arrived. Put today's date
in as `YYYY-MM-DD` when you add an activity. Leave `added` out and the tile
simply never shows the badge — nothing breaks, and the same goes for a date
you typo.

The badge is about the *tile*, not the child. What the child has done shows
in the footer underneath: three grey stars before they have finished it,
then earned stars and `Best 72%`. The two used to be the same word, which
meant a tile said "New" forever if nobody ever played it.

To change how long the badge lasts, edit `NEW_FOR_DAYS` near the top of the
script in `index.html`.

## Writing a math practice test

### The rules for every math test from now on

When a new topic's Assessment Practice comes home, it becomes a test like
this. `data/sets/evan-math-topic4.js` is the model to copy.

1. **One kind of problem per item on the paper**, worded the way the paper
   words it. The header comment maps each paper item to its kind.
2. **Anything crossed out on the paper is left out** — that *type* of problem
   doesn't appear on the test at all. Ask if a mark is ambiguous: on Topic 4,
   lines through the words of #21 and #25 were Evan doodling, not a cross-out.
3. **A new test every time he opens it.** The content file has a
   `generate()` that writes fresh numbers on each attempt, and `shuffle: true`
   deals the questions in a new order. Answer choices are rebuilt too, with
   the right letter spread evenly over A-D, and wrong choices that copy real
   slips (one group too many or too few, a forgotten partial product, a
   place-value or adding mistake).
4. **Scratch paper wherever he showed work on the paper.** If he drew an area
   model or wrote working for an item, it gets the scratch pad. Open-response
   items are `type: "work"`: scratch paper plus an answer he types on on-screen
   number keys — never a text field, so the iPad keyboard (and talk-to-text)
   never appears. A multiple-choice item he worked out gets `pad: true`.
5. **It has to look like his real test.** The question card copies the plain
   online-test look; don't restyle it.
6. **Built for how he uses it: a standard iPad, landscape, in a browser with
   tabs** — a window about 1080-1180 wide and 730-740 tall. In landscape the
   scratch paper fills the left side on every question and the test sits on
   the right. Check that every question fits that window without scrolling.
7. **Check every answer key by machine.** Run `generate()` a few thousand
   times and re-work each answer from the numbers in the question; a wrong
   key teaches the wrong thing.

`data/sets/evan-math-topic3.js` is the older, fixed style — one hand-written
question per paper item, the same every time. It still works, but new topics
should be generated.

### The question format

Every question needs a `type`:

| `type`     | What the child does            | Fields it needs                    |
|------------|--------------------------------|------------------------------------|
| `"choice"` | Picks one answer               | `choices`, `answer` (an index)     |
| `"multi"`  | Picks every answer that fits   | `choices`, `answers` (index list)  |
| `"drag"`   | Drags numbers into blanks      | `bank`, `template`, `answers`      |
| `"work"`   | Works it out on scratch paper, types the answer | `answer` (a number), or `entries` |

Useful extras:

- `explain` — the short note shown once he's answered. Always worth writing;
  it's what he reads when he gets one wrong.
- `audioChoices: true` — puts a ▶ bar on each answer choice, not just on the
  question. The real test does this on the wordier problems.
- `figure` — a block of monospaced text (a table, a column sum) under the
  question.
- `mono: true` on a `"drag"` question lines the blanks up in a column, for a
  vertical algorithm. A template line of `"---"` draws the rule above the
  total.
- `pad: true` on a `"choice"` question shows the scratch paper with it (in
  landscape every question has scratch paper; upright, only these and
  `"work"` questions do).
- `entries` on a `"work"` question asks for more than one number:
  `[{ label: "A", answer: 100 }, { label: "B", answer: 50 }]`. `accept` lists
  other numbers that also count — `{ answer: 80000, accept: [72000] }` for an
  estimate that can fairly be rounded two ways.
- `generate` and `shuffle` on the set itself: see the rules above.
- `\n` inside `prompt` starts a new line.
- In a `"drag"` question, `template` is the lines of text and `{0} {1} {2}`
  mark where the blanks go; `answers` lists what belongs in each one. The
  same number can be used in more than one blank.

Counting is left to the engine, so **check your answer keys** — a wrong key
teaches the wrong thing. Indexes start at 0, so `answer: 2` is the *third*
choice.

Read-aloud uses the voice built into the browser (Chrome or Safari), so
there are no audio files to record or store. Math symbols are spoken as
words — `×` becomes "times", `<` becomes "is less than" — and a question
can override the whole spoken line with a `say` field if a voice mangles it.

## File map

```
index.html            Home screen (built from the manifest)
assets/styles.css     Shared look for the home screen
assets/loader.js      Shared helper the engines use to load content
data/manifest.js      The table of contents — edit this to change the menu
data/sets/            One file per assignment (the content)
engines/vocab/        Definition → word game
engines/speak/        Say-the-word game
engines/math/         Practice test with read-aloud
manifest.json         iPad "add to home screen" app settings
```

## Use it as an app (full screen)

Opened from the iPad's Home Screen, the site runs full screen like an app —
no Safari tabs, no address bar — which gives the test and the scratch paper
the whole screen.

1. Open the site in **Safari** on the iPad.
2. Tap the **Share** button (the square with the arrow), then **Add to Home
   Screen**, then **Add**.
3. Open it from the new **Practice** icon from now on.

**Stars and streaks start fresh in the app.** iPadOS keeps a Home Screen
app's saved data separate from Safari's, so progress earned in Safari tabs
doesn't carry over (and the other way round). Pick one and stick with it —
the app is the better one.

There's no pull-to-refresh in the app. A new assignment shows up the next
time the app is opened; to force it, swipe the app away in the app switcher
and open it again.

## Publishing

**The live site is whatever is on `main`.** A branch, or a pull request that
is still open, changes nothing the kids can see. If a new activity isn't
showing up, the first thing to check is whether it actually landed on `main`.

One-time setup:

1. Open the repository in GitHub → **Settings** → **Pages**.
2. Source: **Deploy from branch**, Branch: **main**, Folder: **/ (root)**, Save.
3. The site appears at `https://YOUR-USERNAME.github.io/REPO-NAME/`.
4. On the iPad, open that link in Safari, tap **Share → Add to Home Screen**.

After that, every change goes live the same way:

1. Commit and push.
2. Get it onto `main` — push straight there, or merge the pull request.
3. Pages rebuilds by itself, usually within a minute.
4. **Force a refresh on the iPad.** Safari caches hard, and a Home Screen app
   holds the old copy longer than the browser does. Pull down to refresh, or
   close the app card and reopen it. When a change looks missing but is
   definitely on `main`, this is almost always why.

### Why a change used to take ten minutes to show up

GitHub Pages serves every file with `cache-control: max-age=600`. There is
no setting for this — not in Settings → Pages, not in any file you can add
to the repo. It is GitHub's, and a static site cannot override it.

So a browser that had already visited would reuse the menu it already had
for ten minutes, and a newly added assignment simply wasn't there.

The way round it is to ask for a web address the cache has never seen.
`data/manifest.js` and the files in `data/sets/` are now loaded with a
`?v=<timestamp>` on the end, which changes every page load, so the browser
always fetches the current copy. They are a couple of kilobytes each, so
this costs nothing worth measuring.

Code files — `index.html`, the engines, `assets/` — are still cached the
normal way, because they change rarely. That means a change to the *app
itself* (not to an assignment) can still take up to ten minutes to reach a
browser that was recently open. Adding or editing an assignment, which is
the thing you do often, now shows up at once.

## Conventions

- **Keep the iOS-style look** defined in `assets/styles.css` — the shared design
  system used by the home screen and all engines. The one deliberate exception
  is the question card inside `engines/math/`, which copies the plain look of
  the real online test on purpose, so the format is familiar on test day. The
  menu bar and the results screen there still use the shared style.
- **Evan's games mark nothing until the end.** No "Correct" or "Incorrect"
  after a question, no running score, nothing coloured red or green while he
  works. He can go **Back**, and **Next** skips a question he wants to come
  back to; the last question has a **Submit** button, with a note above it
  naming anything still blank. After Submit, the results screen shows the
  score, then a review sheet listing every question: a tick or a cross, what
  he put, and the right answer. Build it from the shared `.review-cap` /
  `.rev` styles in `assets/styles.css` so the sheet looks the same in every
  game.
- **The button that moves you on lives in an `.action-bar`.** On an iPad with
  Safari's tab bar showing, a tall question used to push Next off the bottom
  of the screen. The engine shell fills exactly the visible window and the
  `.action-bar` row is pinned to its bottom, so the button is always on screen
  without scrolling. New engines should put their Next / Check / Finish
  buttons in one: `<div class="action-bar"><button class="btn-primary">…`.
  Short windows also get tighter spacing (the `max-height` rules at the end
  of `assets/styles.css` and in each engine) — text size stays put.
- **Don't nest a `<button>` inside a `<button>`.** The browser silently splits
  them apart and the layout breaks. The math engine's answer choices are
  `<div role="radio">` for exactly this reason — they contain a play button.
- **Commit messages: no `Co-Authored-By:` trailer.** Commits are authored by the
  user alone — write a normal message with no co-author line.
- **Finished work belongs on `main`.** Committing and pushing is not delivery —
  the kids see `main` and only `main`. Don't leave a tested change sitting in
  an open or draft pull request and call it done; merge it, or say plainly
  what is blocking the merge.
- **Stick to what was asked.** Don't fold unrelated changes into a commit. If
  you spot something else worth fixing, mention it rather than doing it.
