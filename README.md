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
    test: tap ▶ to hear the question read aloud, answer, and get told
    right or wrong straight away.
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
   { set: "your-file-name", title: "What kids see", engine: "vocab" }
   ```
   (`engine` is `"vocab"`, `"speak"`, or `"math"`.)
3. Save, commit, and push. It appears on the home screen automatically.

To retire an assignment, just delete its line from `data/manifest.js`
(you can leave the content file for later). A subject with no activities
shows "Coming soon" — that's why **Eli's Math** is a placeholder right now.

## Writing a math practice test

`data/sets/evan-math-topic3.js` mirrors Evan's Topic 3 Assessment Practice
(Savvas enVision, pp. 127-128) one question at a time — same pattern and
standard as the paper, different numbers. Its header comment maps each
question back to the item it came from, so when a new topic comes home you
can see how a paper test turns into a content file.

Every question needs a `type`:

| `type`     | What the child does            | Fields it needs                    |
|------------|--------------------------------|------------------------------------|
| `"choice"` | Picks one answer               | `choices`, `answer` (an index)     |
| `"multi"`  | Picks every answer that fits   | `choices`, `answers` (index list)  |
| `"drag"`   | Drags numbers into blanks      | `bank`, `template`, `answers`      |

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

## GitHub Pages setup

1. Open the repository in GitHub → **Settings** → **Pages**.
2. Source: **Deploy from branch**, Branch: **main**, Folder: **/ (root)**, Save.
3. The site appears at `https://YOUR-USERNAME.github.io/REPO-NAME/`.
4. On the iPad, open that link in Safari, tap **Share → Add to Home Screen**.

## Conventions

- **Keep the iOS-style look** defined in `assets/styles.css` — the shared design
  system used by the home screen and all engines. The one deliberate exception
  is the question card inside `engines/math/`, which copies the plain look of
  the real online test on purpose, so the format is familiar on test day. The
  menu bar and the results screen there still use the shared style.
- **Don't nest a `<button>` inside a `<button>`.** The browser silently splits
  them apart and the layout breaks. The math engine's answer choices are
  `<div role="radio">` for exactly this reason — they contain a play button.
- **Commit messages: no `Co-Authored-By:` trailer.** Commits are authored by the
  user alone — write a normal message with no co-author line.
- **Only commit or push when explicitly asked.**
