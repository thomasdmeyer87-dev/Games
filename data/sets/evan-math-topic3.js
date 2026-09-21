/* Content for the "math" engine.

   Topic 3 — Multiply by 1-Digit Numbers (Savvas enVision, Assessment
   Practice pp. 127-128). Every question here mirrors one item on that
   assessment: same pattern, same standard, different numbers.

     paper    here   standard     pattern
     ------   ----   ----------   -------------------------------------
      1        1     4.NSO.2.2    fill in the partial products
      2        2     4.NSO.2.2    find the product of a 3-digit number
      3        3     4.NSO.2.2    two group sizes, add the totals
      4        4     4.NSO.2.2    select all with a given answer
      5A       5     4.NSO.2.3    read a table, standard algorithm
      5B       6     4.NSO.2.2    area model, partial products
      6        7     4.NSO.2.2    which expression has the same value
      7A       8     4.NSO.2.2    select all the partial products
      7B       9     4.NSO.2.2    add the partial products
      8       10     4.NSO.2.2    add first, then multiply
      9       11     4.NSO.2.2    select all equivalent expressions
     10A      12     4.NSO.2.5    is the estimate reasonable?
     10B      13     4.NSO.2.3    standard algorithm for the total

   See README.md for the question format.                              */

(window.SETS = window.SETS || {})["evan-math-topic3"] = {
  questions: [
    {
      type: "drag",
      mono: true,
      prompt: "Use numbers from the box to show how to multiply 214 by 4.\nWrite the partial products in order — ones, then tens, then hundreds — and then the total.",
      figure: "  214\n×   4\n───────",
      bank: ["16", "40", "44", "80", "400", "800", "856", "865"],
      template: ["  {0}", "  {1}", "+ {2}", "---", "  {3}"],
      answers: ["16", "40", "800", "856"],
      explain: "Multiply one place at a time: 4 × 4 ones = 16, 4 × 1 ten = 40, 4 × 2 hundreds = 800. Add the three partial products: 16 + 40 + 800 = 856."
    },
    {
      type: "choice",
      prompt: "Find the product.\n452 × 3",
      choices: ["1,256", "1,356", "1,456", "12,156"],
      answer: 1,
      explain: "3 × 2 = 6. Then 3 × 5 = 15, so write 5 and carry the 1. Then 3 × 4 = 12, plus the 1 carried = 13. That makes 1,356. Carrying the 1 twice gives 1,456, and forgetting it gives 1,256."
    },
    {
      type: "choice",
      audioChoices: true,
      prompt: "Ms. Reyes sells muffins in boxes of 30 and in boxes of 60. If she sells 5 boxes of 60 and 7 boxes of 30, how many muffins did Ms. Reyes sell?",
      choices: ["12 muffins", "90 muffins", "510 muffins", "5,100 muffins"],
      answer: 2,
      explain: "Do each size on its own, then add. 5 boxes of 60 is 5 × 60 = 300. 7 boxes of 30 is 7 × 30 = 210. Together that is 300 + 210 = 510."
    },
    {
      type: "multi",
      prompt: "Select all of the expressions that have an answer of 480.",
      choices: ["(4 × 100) + (8 × 10)", "8 × 62", "60 × 8 × 1", "120 × 4", "(4 × 100) × (8 × 10)"],
      answers: [0, 2, 3],
      explain: "(4 × 100) + (8 × 10) = 400 + 80 = 480. 60 × 8 × 1 = 480. 120 × 4 = 480. The other two miss: 8 × 62 = 496, and (4 × 100) × (8 × 10) multiplies instead of adds, giving 400 × 80 = 32,000."
    },
    {
      type: "choice",
      audioChoices: true,
      prompt: "A garden club keeps its plants in rows. There are 7 carrot plants in each row.\nUse a standard algorithm to find how many carrot plants were planted.",
      figure: "Produce     Number of Rows\n─────────────────────────\nCarrots            56\nOnions             16\nLettuce            13\nBeans              24",
      choices: ["63 plants", "392 plants", "3,542 plants", "3,920 plants"],
      answer: 1,
      explain: "The table says carrots have 56 rows, and each row has 7 plants, so multiply 56 × 7. 7 × 6 = 42, write 2 and carry the 4. Then 7 × 5 = 35, plus the 4 carried = 39. That makes 392. Writing the two partial products side by side instead of adding them gives 3,542."
    },
    {
      type: "drag",
      prompt: "There are 7 onion plants in each row. The area model breaks 16 into 10 and 6.\nDrag the numbers to complete the partial products and the total.",
      figure: "        10      +       6\n      ┌─────────┬─────────┐\n   7  │  7 × 10 │  7 × 6  │\n      └─────────┴─────────┘",
      bank: ["42", "60", "70", "76", "112", "130"],
      template: ["7 × 10 = {0}", "7 × 6 = {1}", "Total = {2}"],
      answers: ["70", "42", "112"],
      explain: "The area model splits 16 into 10 and 6. That gives 7 × 10 = 70 and 7 × 6 = 42. Add the two parts: 70 + 42 = 112."
    },
    {
      type: "choice",
      prompt: "Which expression has the same value as 4 × 528?",
      choices: [
        "(4 × 5) + (4 × 2) + (4 × 8)",
        "(4 × 50) + (4 × 20) + (4 × 80)",
        "(4 × 500) + (4 × 2) + (4 × 8)",
        "(4 × 500) + (4 × 20) + (4 × 8)"
      ],
      answer: 3,
      explain: "Break 528 into its places: 500 + 20 + 8. Multiply each one by 4 and keep the place value, which gives (4 × 500) + (4 × 20) + (4 × 8)."
    },
    {
      type: "multi",
      prompt: "Select all the partial products for 6 × 432.",
      choices: ["12", "18", "180", "1,800", "2,400"],
      answers: [0, 2, 4],
      explain: "432 is 400 + 30 + 2, so the partial products are 6 × 2 = 12, 6 × 30 = 180, and 6 × 400 = 2,400. 18 and 1,800 use the wrong place value."
    },
    {
      type: "choice",
      prompt: "Add the partial products from the question before this one to find 6 × 432.\n2,400 + 180 + 12",
      choices: ["2,412", "2,580", "2,592", "2,952"],
      answer: 2,
      explain: "2,400 + 180 = 2,580, and 2,580 + 12 = 2,592. Leaving out 180 gives 2,412, and leaving out 12 gives 2,580 — every partial product has to go in."
    },
    {
      type: "choice",
      audioChoices: true,
      prompt: "Ruiz Deli makes 185 sandwiches and 35 salads every hour. How many items are made in 6 hours?",
      choices: ["226 items", "1,110 items", "1,230 items", "1,320 items"],
      answer: 3,
      explain: "Find one hour first: 185 + 35 = 220 items. Then multiply by the 6 hours: 220 × 6 = 1,320. Multiplying only the sandwiches gives 1,110, which leaves the salads out."
    },
    {
      type: "multi",
      prompt: "Select all of the expressions that are equivalent to 7 × 296.",
      choices: [
        "(7 × 200) + (7 × 90) + (7 × 6)",
        "(7 × 200) + 96",
        "296 × 7",
        "(7 × 300) − (7 × 96)",
        "(7 × 300) − (7 × 4)"
      ],
      answers: [0, 2, 4],
      explain: "296 splits into 200 + 90 + 6, so the first one works. 296 × 7 is the same product in the other order. 296 is also 300 − 4, so (7 × 300) − (7 × 4) works. The other two change the number: (7 × 200) + 96 forgets to multiply the 96, and 300 − 96 is 204, not 296."
    },
    {
      type: "choice",
      audioChoices: true,
      prompt: "Mrs. Banks wants to buy a tablet for each of her 2 daughters and 3 sons. Each tablet costs $89.\nMrs. Banks thinks the total cost should be about $200. Is this amount reasonable?",
      choices: [
        "Yes. $89 rounds to $90, and 2 × $90 = $180, which is about $200.",
        "No. $89 rounds to $90, and 5 × $90 = $450.",
        "Yes. There are 5 tablets at about $40 each, and 5 × $40 = $200.",
        "No. $89 rounds to $100, and 5 × $100 = $5,000."
      ],
      answer: 1,
      explain: "Count the people first: 2 daughters and 3 sons is 5 tablets, not 2. Round $89 to $90, then 5 × $90 = $450. So $200 is far too low."
    },
    {
      type: "choice",
      prompt: "Use a standard algorithm to find the total cost of the 5 tablets at $89 each.",
      figure: "   89\n×   5",
      choices: ["$94", "$405", "$445", "$4,045"],
      answer: 2,
      explain: "5 × 9 = 45, so write 5 and carry the 4. Then 5 × 8 = 40, plus the 4 carried = 44. That makes $445 — close to the $450 estimate, so the answer is reasonable."
    }
  ]
};
