/* Shared helper used by every game engine.
   Reads ?set=... from the URL, loads the manifest + that content
   file, and hands back the data plus its title. */

window.GameLoader = {
  param(name) {
    return new URLSearchParams(location.search).get(name);
  },

  // GitHub Pages caches for ten minutes and a static site cannot change
  // that. These are tiny content files, and a stale one means yesterday's
  // words, so always ask for the current copy.
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src + (src.includes("?") ? "&" : "?") + "v=" + Date.now();
      s.onload = resolve;
      s.onerror = () => reject(new Error("Could not load " + src));
      document.head.appendChild(s);
    });
  },

  // rootRel = path back to the site root, e.g. "../../" from engines/x/
  async loadSet(rootRel) {
    const id = (this.param("set") || "").replace(/[^a-z0-9-]/gi, "");
    if (!id) throw new Error("No activity chosen (missing ?set= in the link).");

    await this.loadScript(rootRel + "data/manifest.js");
    await this.loadScript(rootRel + "data/sets/" + id + ".js");

    // One content file can be taken more than one way — a Quick Check and a
    // Practice Assessment from the same questions — told apart by ?mode=.
    // Usually one tile lists its  modes  and the engine asks which.
    const mode = (this.param("mode") || "").replace(/[^a-z]/gi, "");
    let meta = null, kidId = null;
    (window.MANIFEST?.kids || []).forEach(kid =>
      (kid.subjects || []).forEach(sub =>
        (sub.activities || []).forEach(act => {
          if (act.set !== id) return;
          if ((act.mode || "") === mode || !meta) { meta = act; kidId = kid.id; }
        })
      )
    );

    const data = (window.SETS || {})[id];
    if (!data) throw new Error("No content found for: " + id);

    // Stars and history are kept per tile. "full" keeps the plain set id, so a
    // test that gains a Quick Check keeps the scores it already had.
    const key = mode && mode !== "full" ? id + ":" + mode : id;
    const modes = (meta && meta.modes) || null;
    const picked = modes && modes.find(m => m.mode === mode);
    const base = (meta && meta.title) || id;
    const title = picked ? `${base} · ${picked.title}` : base;
    return { id, mode, key, data, meta, kidId, title, base, modes };
  }
};
