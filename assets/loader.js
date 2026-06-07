/* Shared helper used by every game engine.
   Reads ?set=... from the URL, loads the manifest + that content
   file, and hands back the data plus its title. */

window.GameLoader = {
  param(name) {
    return new URLSearchParams(location.search).get(name);
  },

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
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

    let meta = null, kidId = null;
    (window.MANIFEST?.kids || []).forEach(kid =>
      (kid.subjects || []).forEach(sub =>
        (sub.activities || []).forEach(act => {
          if (act.set === id) { meta = act; kidId = kid.id; }
        })
      )
    );

    const data = (window.SETS || {})[id];
    if (!data) throw new Error("No content found for: " + id);

    return { id, data, meta, kidId, title: (meta && meta.title) || id };
  }
};
