/* Content for the "speak" engine (say-the-word game).

   words = the list of words the child reads aloud.
   alts  = OPTIONAL. Sound-alikes the speech recognizer might hear
           instead. Anything listed here still counts as correct.
           You usually don't need many — add one if a word keeps
           getting marked wrong unfairly. */

(window.SETS = window.SETS || {})["eli-sight-words"] = {
  words: [
    "four", "laugh", "every", "before", "walk", "does", "better", "mother", "blue",
    "great", "move", "near", "done", "buy", "another", "carry", "father", "answer",
    "boy", "change", "school", "about", "only", "wash", "learn", "never", "eight",
    "city", "away", "earth", "even", "through", "some", "very", "below", "any"
  ],
  alts: {
    "four": ["for", "fore", "4"], "eight": ["ate", "8"], "buy": ["by", "bye"],
    "blue": ["blew"], "some": ["sum"], "through": ["threw", "thru"],
    "earth": ["ur"], "does": ["duz"], "carry": ["kerry"], "father": ["farther"],
    "every": ["evry"], "before": ["b4"], "school": ["skool"], "about": ["bout"],
    "learn": ["lern"], "answer": ["anser"], "another": ["anuther"],
    "better": ["beter"], "change": ["chainge"], "laugh": ["laf", "laff"],
    "great": ["grate"], "move": ["moove"], "done": ["dun"], "any": ["eny"],
    "walk": ["wok"], "away": ["aweigh"], "very": ["verry"], "boy": ["boi"],
    "never": ["nevr"], "below": ["b'low"], "even": ["evan"], "wash": ["wosh"],
    "near": ["neer"], "only": ["onley"], "city": ["citty"]
  }
};
