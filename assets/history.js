/* ============================================================
   Work history — every finished test, saved on the device.

   Each entry keeps what a parent needs to see what was missed:
   when, which activity, the score, and for every question the
   prompt, what he put, the right answer, and his scratch paper.

   Saved in localStorage like Progress: on this iPad, in this
   browser (or this Home Screen app) only. Scratch paper is stored
   as strokes, not pictures — a fraction of the size — and the
   oldest entries are dropped first if space runs short.

   Engines call  WorkHistory.save(entry)  when a test is handed in.
   history.html lists entries and shows each one in full.
   (Not "History": that name already belongs to the browser.)
   ============================================================ */

window.WorkHistory = {
  KEY: "practice.history.v1",
  MAX: 60,                                  // entries kept, newest win

  list() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { return []; }
  },

  get(id) { return this.list().find(e => e.id === id) || null; },

  save(entry) {
    entry.id = entry.id || Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    entry.at = entry.at || new Date().toISOString();
    let all = this.list().concat(entry).slice(-this.MAX);
    // Full storage: drop the oldest until it fits. If this one entry alone is
    // too big, keep its answers and lose the drawings rather than lose it all.
    for (;;) {
      try { localStorage.setItem(this.KEY, JSON.stringify(all)); return entry.id; }
      catch {
        if (all.length > 1) { all.shift(); continue; }
        if (entry.items && entry.items.some(i => i.pad)) { entry.items.forEach(i => delete i.pad); continue; }
        return null;
      }
    }
  },

  remove(id) {
    try { localStorage.setItem(this.KEY, JSON.stringify(this.list().filter(e => e.id !== id))); } catch {}
  },

  /* ---- scratch paper ------------------------------------------------
     Strokes come in as [{ erase, pts: [{x, y}, ...] }, ...] and are stored
     as [[erase 0|1, x0, y0, x1, y1, ...], ...] in whole pixels, skipping
     points under 1.5px apart — the line looks the same at a sixth of the size. */
  encodePad(strokes) {
    if (!strokes || !strokes.length) return null;
    return strokes.map(s => {
      const out = [s.erase ? 1 : 0];
      let lx = null, ly = null;
      s.pts.forEach((p, i) => {
        const x = Math.round(p.x), y = Math.round(p.y);
        const last = i === s.pts.length - 1;
        if (lx === null || last || Math.hypot(x - lx, y - ly) >= 1.5) { out.push(x, y); lx = x; ly = y; }
      });
      return out;
    });
  },

  // A picture of the scratch paper, cropped to where he wrote, as a PNG data
  // URL (transparent, so the page shows white paper behind it). Null if blank.
  padImage(enc, maxW = 420, maxH = 300) {
    if (!enc || !enc.length) return null;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    enc.forEach(s => { if (s[0]) return;
      for (let i = 1; i < s.length; i += 2) {
        x0 = Math.min(x0, s[i]); x1 = Math.max(x1, s[i]);
        y0 = Math.min(y0, s[i + 1]); y1 = Math.max(y1, s[i + 1]);
      } });
    if (x0 === Infinity) return null;
    const m = 14; x0 -= m; y0 -= m; x1 += m; y1 += m;
    const scale = Math.min(1.4, maxW / (x1 - x0), maxH / (y1 - y0));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const c = document.createElement("canvas");
    c.width = Math.ceil((x1 - x0) * scale * dpr); c.height = Math.ceil((y1 - y0) * scale * dpr);
    const ctx = c.getContext("2d");
    ctx.scale(scale * dpr, scale * dpr); ctx.translate(-x0, -y0);
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#1f2a44";
    enc.forEach(s => {
      ctx.globalCompositeOperation = s[0] ? "destination-out" : "source-over";
      ctx.lineWidth = s[0] ? 22 : 2.4;
      ctx.beginPath(); ctx.moveTo(s[1], s[2]);
      if (s.length === 3) ctx.lineTo(s[1] + 0.1, s[2]);
      for (let i = 3; i < s.length; i += 2) ctx.lineTo(s[i], s[i + 1]);
      ctx.stroke();
    });
    return { src: c.toDataURL("image/png"), w: Math.round((x1 - x0) * scale), h: Math.round((y1 - y0) * scale) };
  }
};
