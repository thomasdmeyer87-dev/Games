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
- **Content** (in `data/sets/`) — the *material* for one assignment, e.g. a
  word list or a set of definitions. These are tiny files you edit often.

The home page is built automatically from **`data/manifest.js`**, which lists
each kid, their subjects, and which activities show up.

## How to add a new assignment

1. **Make a content file.** Copy an existing file in `data/sets/` and rename
   it (use only lowercase letters, numbers, and dashes), then edit the words.
   - For a vocab quiz, copy `data/sets/evan-vocab-3.js`.
   - For a say-the-word game, copy `data/sets/eli-sight-words.js`.
2. **List it in `data/manifest.js`.** Add an entry under the right kid/subject:
   ```js
   { set: "your-file-name", title: "What kids see", engine: "vocab" }
   ```
   (`engine` is either `"vocab"` or `"speak"`.)
3. Save, commit, and push. It appears on the home screen automatically.

To retire an assignment, just delete its line from `data/manifest.js`
(you can leave the content file for later). A subject with no activities
shows "Coming soon" — that's why **Math** is a placeholder right now.

## File map

```
index.html            Home screen (built from the manifest)
assets/styles.css     Shared look for the home screen
assets/loader.js      Shared helper the engines use to load content
data/manifest.js      The table of contents — edit this to change the menu
data/sets/            One file per assignment (the content)
engines/vocab/        Definition → word game
engines/speak/        Say-the-word game
manifest.json         iPad "add to home screen" app settings
```

## GitHub Pages setup

1. Open the repository in GitHub → **Settings** → **Pages**.
2. Source: **Deploy from branch**, Branch: **main**, Folder: **/ (root)**, Save.
3. The site appears at `https://YOUR-USERNAME.github.io/REPO-NAME/`.
4. On the iPad, open that link in Safari, tap **Share → Add to Home Screen**.

## Math (coming later)

Math is intentionally just a "Coming soon" selection for now. The plan is to
turn a photo of a practice worksheet into a math content file (a new engine
plus `data/sets/...` files), so it drops into this same framework.
