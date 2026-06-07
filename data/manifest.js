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
        - engine = which game to use: "vocab" or "speak"

   An empty activities list (like Math below) shows "Coming soon".
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
            { set: "evan-vocab-3", title: "Key Literacy Terms 3", engine: "vocab" },
            { set: "evan-vocab-4", title: "Key Literacy Terms 4", engine: "vocab" }
          ]
        },
        {
          name: "Math",
          activities: []   // empty for now → shows "Coming soon"
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
            { set: "eli-sight-words", title: "Say the Word!", engine: "speak" }
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
