/* ============================================================
   Progress + rewards — saved on the device (localStorage).
   No accounts, no server. Each browser/iPad keeps its own.

   What it tracks per kid:
     - totalStars : running total of stars earned (the big number)
     - streak     : consecutive days with at least one finished activity
     - level      : derived from totalStars
     - activities : per-activity best score + best stars + play count

   Engines call Progress.record(kidId, setId, percent) when a game
   finishes. The home screen reads Progress.getKid / getActivity.
   ============================================================ */

window.Progress = {
  KEY: "practice.progress.v1",
  STARS_PER_LEVEL: 15,

  _load() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || { kids: {} }; }
    catch { return { kids: {} }; }
  },
  _save(d) {
    try { localStorage.setItem(this.KEY, JSON.stringify(d)); } catch {}
  },
  _kid(d, id) {
    return d.kids[id] || (d.kids[id] = { totalStars: 0, streak: 0, lastDay: null, activities: {} });
  },
  _dayString(date) {
    return date.getFullYear() + "-" +
      String(date.getMonth() + 1).padStart(2, "0") + "-" +
      String(date.getDate()).padStart(2, "0");
  },

  // Stars awarded for a given percent score (0–3)
  starsFor(pct) { return pct >= 90 ? 3 : pct >= 70 ? 2 : pct > 0 ? 1 : 0; },

  level(totalStars) {
    const per = this.STARS_PER_LEVEL;
    const inLevel = totalStars % per;
    return { num: Math.floor(totalStars / per) + 1, inLevel, perLevel: per, pct: Math.round(inLevel / per * 100) };
  },

  getKid(id) {
    const k = this._kid(this._load(), id);
    return {
      totalStars: k.totalStars || 0,
      streak: k.streak || 0,
      level: this.level(k.totalStars || 0),
      activities: k.activities || {}
    };
  },

  getActivity(kidId, setId) {
    const k = this._kid(this._load(), kidId);
    return k.activities[setId] || { bestStars: 0, bestPct: 0, plays: 0 };
  },

  // Record a finished game. Returns what was earned (for the results screen).
  record(kidId, setId, pct) {
    pct = Math.max(0, Math.min(100, Math.round(pct)));
    const d = this._load();
    const k = this._kid(d, kidId);
    const stars = this.starsFor(pct);

    const a = k.activities[setId] || (k.activities[setId] = { bestStars: 0, bestPct: 0, plays: 0 });
    const isNewBest = stars > a.bestStars || pct > a.bestPct;
    a.plays++;
    a.bestPct = Math.max(a.bestPct, pct);
    a.bestStars = Math.max(a.bestStars, stars);

    k.totalStars = (k.totalStars || 0) + stars;

    // Streak: bump once per calendar day
    const today = this._dayString(new Date());
    let streakUp = false;
    if (k.lastDay !== today) {
      const y = new Date(); y.setDate(y.getDate() - 1);
      k.streak = (k.lastDay === this._dayString(y)) ? (k.streak || 0) + 1 : 1;
      k.lastDay = today;
      streakUp = true;
    }

    this._save(d);
    return { stars, isNewBest, streakUp, totalStars: k.totalStars, streak: k.streak, bestStars: a.bestStars, level: this.level(k.totalStars) };
  },

  reset() { try { localStorage.removeItem(this.KEY); } catch {} }
};
