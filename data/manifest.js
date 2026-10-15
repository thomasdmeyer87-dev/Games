/* ============================================================
   MANIFEST  —  the "table of contents" for the whole site.

   This is the ONE file you edit to change what shows up on the
   home screen. Each kid has subjects, and each subject has a
   list of activities.

   To add a new assignment:
     1. Create a content file in  data/sets/  (copy an existing one).
     2. Add an entry to the matching subject's "activities" list below
        with three fields:
        - set    = the file name in data/sets/  (without ".js")
        - title  = the button label kids see
        - engine = which game to use: "vocab", "speak", or "math"
        - added  = the day you added it, as YYYY-MM-DD. For two weeks
                   from that day the tile wears a NEW badge, so the kids
                   can see what just arrived. Leave it out and the tile
                   simply never shows the badge.

   To retire an assignment without losing it:
     Add  archived: true  to its entry. The tile disappears from the home
     screen, but the content file and the kid's scores stay exactly where
     they are. Delete those two words to bring it back.

   An empty activities list (like Eli's Math below) shows "Coming soon".
   ============================================================ */

window.MANIFEST = {
  title: "Homework Practice",

  kids: [
    {
      id: "evan",
      name: "Evan",
      grade: "4th Grade",
      avatar: "🦊",                  // tap-friendly identity — change freely
      colors: ["#34d399", "#059669"], // theme gradient (light → dark)
      subjects: [
        {
          name: "ELA",
          activities: [
            // Archived 2026-10-15 — finished with these two. Scores are kept;
            // delete  archived: true  to put either back on the home screen.
            { set: "evan-vocab-3", title: "Key Literacy Terms 3", engine: "vocab" , added: "2026-06-07", archived: true },
            { set: "evan-vocab-4", title: "Key Literacy Terms 4", engine: "vocab" , added: "2026-06-07", archived: true },
            { set: "evan-vocab-graph", title: "16 October Vocab Test List", engine: "vocab" , added: "2026-10-15" }
          ]
        },
        {
          name: "Math",
          activities: [
            { set: "evan-math-topic3", title: "Topic 3 Practice Test", engine: "math" , added: "2026-09-21" },
            // Archived 2026-10-15. Scores are kept; delete  archived: true  to bring it back.
            { set: "evan-math-multiply", title: "Multiply & Estimate", engine: "math" , added: "2026-09-21", archived: true }
          ]
        }
      ]
    },

    {
      id: "eli",
      name: "Eli",
      grade: "2nd Grade",
      avatar: "🐼",
      colors: ["#60a5fa", "#4f46e5"],
      subjects: [
        {
          name: "ELA",
          activities: [
            { set: "eli-sight-words", title: "Say the Word!", engine: "speak" , added: "2026-06-07" }
          ]
        },
        {
          name: "Math",
          activities: []   // empty for now → shows "Coming soon"
        }
      ]
    }
  ]
};
