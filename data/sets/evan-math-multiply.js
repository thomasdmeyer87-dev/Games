/* Content for the "math" engine — a practice test in the same shape as
   Evan's real online test. Skill: multiplying by a 1-digit number, and
   estimating products.

   Each question needs a "type":

     type: "choice"   one right answer
                      choices: [...]   answer: <index of the right one>
                      audioChoices: true   adds a play bar to each choice

     type: "multi"    select all that apply
                      choices: [...]   answers: [<index>, <index>, ...]

     type: "drag"     drag numbers into blanks
                      bank:     the numbers he can choose from
                      template: lines of text, {0} {1} {2} mark the blanks
                      answers:  what belongs in {0}, {1}, {2} ...

   "explain" is the short note shown after he answers. Use \n in a prompt
   to start a new line.                                                  */

(window.SETS = window.SETS || {})["evan-math-multiply"] = {
  questions: [
    {
      type: "choice",
      prompt: "Use a standard algorithm to find the product.\n3 × 64",
      choices: ["67", "182", "192", "1812"],
      answer: 2,
      explain: "3 × 4 = 12, so write 2 and carry the 1. Then 3 × 6 = 18, plus the 1 carried = 19. That makes 192."
    },
    {
      type: "choice",
      prompt: "Use a standard algorithm to find the product.\n6 × 48",
      choices: ["54", "248", "288", "2448"],
      answer: 2,
      explain: "6 × 8 = 48, so write 8 and carry the 4. Then 6 × 4 = 24, plus the 4 carried = 28. That makes 288."
    },
    {
      type: "multi",
      prompt: "Select all the expressions that have a product of 144.",
      choices: ["72 × 2", "46 × 3", "36 × 4", "29 × 5", "24 × 6"],
      answers: [0, 2, 4],
      explain: "72 × 2, 36 × 4 and 24 × 6 all equal 144. The other two are close but not exact: 46 × 3 = 138 and 29 × 5 = 145."
    },
    {
      type: "choice",
      audioChoices: true,
      prompt: "A theater has 8 rows. Each row has 47 seats. How many seats are in the theater?",
      choices: ["55 seats", "326 seats", "376 seats", "3,256 seats"],
      answer: 2,
      explain: "8 rows of 47 means 8 × 47. Break it up: 8 × 40 = 320 and 8 × 7 = 56. Add them: 320 + 56 = 376."
    },
    {
      type: "drag",
      prompt: "Estimate the product 6 × 782. Drag the numbers below to complete the estimate.\nNumbers may be used once, more than once, or not at all.",
      bank: ["700", "80", "800", "4,800", "6,000", "5,600"],
      template: ["Round 782 to {0}.", "6 × {1} = {2}"],
      answers: ["800", "800", "4,800"],
      explain: "782 is closer to 800 than to 700, so round up. Then 6 × 8 = 48, so 6 × 800 = 4,800."
    },
    {
      type: "choice",
      prompt: "An office bought 6 cases of water. Each case has 89 bottles.\nWhich number sentence can be used to estimate the total number of bottles?",
      choices: ["6 × 80 = 480", "6 + 90 = 96", "90 − 6 = 84", "6 × 90 = 540"],
      answer: 3,
      explain: "Estimating means rounding first. 89 rounds up to 90, and 6 cases of 90 is 6 × 90 = 540."
    },
    {
      type: "multi",
      prompt: "Select all the expressions that have a product of 216.",
      choices: ["54 × 4", "43 × 5", "36 × 6", "27 × 8", "38 × 7"],
      answers: [0, 2, 3],
      explain: "54 × 4, 36 × 6 and 27 × 8 all equal 216. The other two do not: 43 × 5 = 215 and 38 × 7 = 266."
    },
    {
      type: "choice",
      audioChoices: true,
      prompt: "A farm packs 7 crates of apples. Each crate holds 86 apples. How many apples are packed?",
      choices: ["93 apples", "562 apples", "602 apples", "5,642 apples"],
      answer: 2,
      explain: "7 crates of 86 means 7 × 86. Break it up: 7 × 80 = 560 and 7 × 6 = 42. Add them: 560 + 42 = 602."
    },
    {
      type: "drag",
      prompt: "Estimate the product 4 × 615. Drag the numbers below to complete the estimate.\nNumbers may be used once, more than once, or not at all.",
      bank: ["600", "60", "700", "2,400", "2,800", "4,000"],
      template: ["Round 615 to {0}.", "4 × {1} = {2}"],
      answers: ["600", "600", "2,400"],
      explain: "615 is closer to 600 than to 700, so round down. Then 4 × 6 = 24, so 4 × 600 = 2,400."
    },
    {
      type: "choice",
      prompt: "Use a standard algorithm to find the product.\n5 × 209",
      choices: ["214", "1,045", "1,145", "10,045"],
      answer: 1,
      explain: "5 × 9 = 45, so write 5 and carry the 4. The middle digit is 0: 5 × 0 = 0, plus the 4 carried = 4. Then 5 × 2 = 10. That makes 1,045."
    },
    {
      type: "multi",
      prompt: "Select all the expressions that have a product greater than 500.",
      choices: ["6 × 92", "4 × 118", "7 × 73", "3 × 164", "9 × 58"],
      answers: [0, 2, 4],
      explain: "6 × 92 = 552, 7 × 73 = 511 and 9 × 58 = 522 are all over 500. The other two fall short: 4 × 118 = 472 and 3 × 164 = 492."
    },
    {
      type: "choice",
      prompt: "A library has 5 shelves. Each shelf holds 212 books.\nWhich number sentence can be used to estimate the total number of books?",
      choices: ["5 × 200 = 1,000", "5 + 200 = 205", "5 × 300 = 1,500", "212 − 5 = 207"],
      answer: 0,
      explain: "212 rounds down to 200, because 12 is less than 50. Then 5 × 2 = 10, so 5 × 200 = 1,000."
    }
  ]
};
