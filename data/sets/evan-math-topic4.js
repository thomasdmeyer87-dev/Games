/* Content for the "math" engine.

   Topic 4 — Multiply by 2-Digit Numbers (Savvas enVision, Assessment
   Practice pp. 191-194).

   This set is GENERATED. Every attempt gets new numbers, new answer
   choices and a new order (shuffle: true). Each kind of problem below
   is one item from the paper: same concept and standard, different
   numbers every time.

   Where Evan drew or wrote his working on the paper, the question has a
   scratch pad. Open-response items are type "work" (scratch pad + typed
   answer); multiple-choice items he worked out have  pad: true.

     paper  kind            standard    on screen
     -----  --------------  ----------  ----------------------------------
      1     roundExpr       4.NSO.2.5   choice   which rounded expression
      2     groups          4.NSO.2.3   work     2-digit × 2-digit, groups
      3     missingFactor   4.NSO.2.5   choice   product ÷ factor, tens
      5     money           4.NSO.2.2   work     3-digit × 2-digit, dollars
      6A    twoMonths       4.NSO.2.2   work     two area models, add them
      8     beadTable       4.NSO.2.5   drag     complete the table
     10     aboutHowMany    4.NSO.2.5   work     estimate, nearest hundred
     12     properties      4.NSO.2.2   choice   (20 + 7) × (10 + 4)
     13     byTens          4.NSO.2.2   work     2-digit × multiple of ten
     14A    dataTable       4.NSO.2.2   work     read a table, tens × tens
     16     jars            4.NSO.2.2   choice+pad  2-digit × 2-digit
     17     missingBox      4.NSO.2.5   choice   40 × ☐ = 16,000
     19     tensWord        4.NSO.2.5   work     tens × tens word problem
     20     hundreds        4.NSO.2.5   choice   700 × 900
     21     standard        4.NSO.2.2   work     standard algorithm, 2 × 2
     22     areaParts       4.NSO.2.2   work     name the four partial products
     23     bestEstimate    4.NSO.2.5   choice+pad  3-digit × 3-digit
     25     areaModel       4.NSO.2.2   work     draw an area model, teen × 2-digit
     26     product3x2      4.NSO.2.2   choice+pad  3-digit × 2-digit
     27     factory         4.NSO.2.2   work     3-digit × 2-digit word problem

   Left out, because they're crossed out on the paper:
     4, 18      select all
     6B, 11, 15 write and solve equations
     7          compatible numbers: estimate and exact
     9          check someone's work
     14B, 14C   the rest of the delivery table
     24         choose a method and explain it

   Wrong answer choices copy the paper's: one group too few or too many
   (456 × 52 → 23,256 / 24,168), the ones part forgotten (27 × 82 → 2,160),
   a slip adding the partial products (±10, ±100), and place value
   (630 / 6,300 / 63,000 / 630,000).                                     */

(function () {
  const R = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  };
  const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // A number in [lo, hi] that doesn't end in 0 (or in 5, when asked) —
  // so it actually needs working out, and rounds one clear way.
  function notRound(lo, hi, no5) {
    let n;
    do { n = R(lo, hi); } while (n % 10 === 0 || (no5 && n % 10 === 5));
    return n;
  }

  // Place-value parts: 456 → [400, 50, 6]
  const parts = n => String(n).split("")
    .map((d, i, s) => Number(d) * 10 ** (s.length - 1 - i)).filter(v => v > 0);

  // The area-model working, the way Evan does it on paper.
  function areaExplain(a, b) {
    const pa = parts(a), pb = parts(b), cells = [];
    pa.forEach(x => pb.forEach(y => cells.push(x * y)));
    return `Break ${fmt(a)} into ${pa.map(fmt).join(" + ")} and ${fmt(b)} into ${pb.map(fmt).join(" + ")}. ` +
      pa.map(x => pb.map(y => `${fmt(x)} × ${fmt(y)} = ${fmt(x * y)}`).join(", ")).join(", ") + ". " +
      `Add the parts: ${cells.map(fmt).join(" + ")} = ${fmt(a * b)}.`;
  }

  // Number choices: the answer plus three wrong ones, smallest to largest
  // (the way the paper lists them). Which letter is right is picked first,
  // then that many wrong answers come from below it and the rest from above,
  // so A, B, C and D each come up about as often.
  function splitWrongs(ans, wrongs) {
    const uniq = [...new Set(wrongs)].filter(w => Number.isInteger(w) && w > 0 && w !== ans);
    const below = shuffle(uniq.filter(w => w < ans)), above = shuffle(uniq.filter(w => w > ans));
    const spots = [0, 1, 2, 3].filter(n => n <= below.length && 3 - n <= above.length);
    return { below, above, spots };
  }
  function numChoices(ans, wrongs, pre = "", post = "") {
    const { below, above, spots } = splitWrongs(ans, wrongs);
    if (!spots.length) {                        // not enough real slips: pad above with ±10s
      for (let k = 1; below.length + above.length < 3; k++) if (!above.includes(ans + 10 * k)) above.push(ans + 10 * k);
      spots.push(Math.min(3, below.length));
    }
    const pos = pick(spots);
    const nums = [ans, ...below.slice(0, pos), ...above.slice(0, 3 - pos)].sort((x, y) => x - y);
    return { choices: nums.map(n => pre + fmt(n) + post), answer: nums.indexOf(ans) };
  }

  // The usual slips when multiplying a by a 2-digit b.
  function productWrongs(a, b) {
    const p = a * b, tens = b - (b % 10);
    return [a * tens, p - a, p + a, p + 2 * a, p - 10, p + 10, p - 100, p + 100];
  }

  // A stacked problem, like the paper:   86
  //                                    × 68
  const stack = (a, b) => {
    const w = Math.max(String(a).length, String(b).length);
    return `  ${String(a).padStart(w)}\n× ${String(b).padStart(w)}\n${"─".repeat(w + 3)}`;
  };

  const NAMES = ["Margo", "Luis", "Priya", "Sam", "Ava", "Noah", "Zoe", "Eli", "Maya", "Jonah", "Ruby", "Omar"];

  /* ---------------------------------------------------------------- */

  const KINDS = {

    // 1. Which expression is a good rounded estimate?
    roundExpr() {
      const c = pick([
        n => ({ rate: `${n} works {h} hours a week`, ask: `how many hours ${n} will work in {w} weeks` }),
        n => ({ rate: `${n} reads {h} pages a day`, ask: `how many pages ${n} will read in {w} days` }),
        n => ({ rate: `${n} swims {h} laps each practice`, ask: `how many laps ${n} will swim in {w} practices` }),
        n => ({ rate: `A baker makes {h} loaves each morning`, ask: `how many loaves the baker will make in {w} mornings` }),
      ])(pick(NAMES));
      const h = notRound(12, 48, true), w = notRound(21, 89, true);
      const r10 = n => Math.round(n / 10) * 10;
      const hr = r10(h), wr = r10(w);
      const hx = h % 10 < 5 ? hr + 10 : hr - 10;     // rounded the wrong way
      const wx = w % 10 < 5 ? wr + 10 : wr - 10;
      const right = `${hr} × ${wr}`;
      const choices = shuffle([right, `${hx} × ${wr}`, `${hx} × ${wx}`, `${h} × ${wx}`]);
      return {
        type: "choice",
        prompt: `${c.rate.replace("{h}", h)}. Which expression shows a good way to use rounding to estimate ${c.ask.replace("{w}", w)}?`,
        choices, answer: choices.indexOf(right),
        explain: `Round each number to the nearest ten: ${h} rounds to ${hr}, and ${w} rounds to ${wr}. So ${hr} × ${wr} = ${fmt(hr * wr)} is a good estimate.`
      };
    },

    // 2. Groups of a, b groups.
    groups() {
      const [things, one, many] = pick([
        ["bottles of paint", "set", "sets"], ["crayons", "box", "boxes"],
        ["stickers", "sheet", "sheets"], ["muffins", "tray", "trays"],
      ]);
      const a = notRound(13, 39), b = notRound(21, 69);
      return {
        type: "work",
        prompt: `There are ${a} ${things} in one ${one}. How many ${things} are in ${b} ${many}?`,
        answer: a * b,
        explain: areaExplain(a, b)
      };
    },

    // 3. Product and one factor → the other factor.
    missingFactor() {
      const f = R(2, 9), g = R(2, 9), F = f * 10, G = g * pick([10, 100]), P = F * G;
      let k = Number(String(P)[0]);
      if (k === g || k < 2) do { k = R(2, 9); } while (k === g);
      const nums = [g * 10, g * 100, k * 10, k * 100].sort((x, y) => x - y);
      return {
        type: "choice",
        prompt: `The product of two factors is ${fmt(P)}. One of the factors is ${F}. What is the other factor?`,
        choices: nums.map(fmt), answer: nums.indexOf(G),
        explain: `${F} × ${fmt(G)} = ${fmt(P)}. Use the basic fact ${f} × ${g} = ${f * g}, then put the zeros back on.`
      };
    },

    // 5. Price × seats.
    money() {
      const t = notRound(21, 89), s = notRound(201, 899);
      const c = pick([
        `Concert tickets each cost $${t}. There are ${s} seats in the theater. How much money does the theater collect from ticket sales for a sold-out show?`,
        `A school buys ${s} T-shirts. Each T-shirt costs $${t}. How much do the T-shirts cost in all?`,
        `A bike tour costs $${t} for each rider. ${s} riders take the tour this summer. How much money does the tour company collect?`,
      ]);
      return { type: "work", prompt: c + "\n(Type the number of dollars.)", answer: s * t, explain: areaExplain(s, t) };
    },

    // 6A. Two area models, then add.
    twoMonths() {
      const n = pick(NAMES);
      const [did, unit] = pick([["hiked", "miles"], ["biked", "miles"], ["swam", "laps"]]);
      let a, b, c, d;
      do { a = notRound(11, 19); b = notRound(11, 19); c = notRound(11, 19); d = notRound(11, 19); }
      while (a * b === c * d);
      const p1 = a * b, p2 = c * d;
      return {
        type: "work",
        prompt: `${n} ${did} ${a} ${unit} ${b} times last month. ${n} ${did} ${c} ${unit} ${d} times this month.\nDraw area models to find how many ${unit} ${n} ${did} during the past two months.`,
        answer: p1 + p2,
        explain: `Last month: ${a} × ${b} = ${parts(a).flatMap(x => parts(b).map(y => fmt(x * y))).join(" + ")} = ${fmt(p1)}. ` +
                 `This month: ${c} × ${d} = ${parts(c).flatMap(x => parts(d).map(y => fmt(x * y))).join(" + ")} = ${fmt(p2)}. ` +
                 `Together: ${fmt(p1)} + ${fmt(p2)} = ${fmt(p1 + p2)}.`
      };
    },

    // 8. Complete the table from the number box.
    beadTable() {
      const n = R(12, 19);
      const [plural, single, items] = pick([["necklaces", "necklace", "beads"], ["bags", "bag", "marbles"], ["boxes", "box", "pencils"]]);
      const counts = shuffle([10, 20, 30, 40, 50, 60, 70, 80, 90]).slice(0, 4).sort((x, y) => x - y);
      const [c1, c2, c3, c4] = counts;
      const answers = [fmt(n * c1), fmt(n * c2), fmt(c3), fmt(c4), fmt(n * c4)];
      const bank = [c3, c4, n * c1, n * c2, n * c4].sort((x, y) => x - y).map(fmt);
      return {
        type: "drag",
        prompt: `${pick(NAMES)} fills ${plural}. Each ${single} has ${n} ${items}. Use the numbers in the box to complete the table.`,
        bank,
        template: [`${c1} ${plural} → {0} ${items}`, `${c2} ${plural} → {1} ${items}`,
                   `{2} ${plural} → ${fmt(n * c3)} ${items}`, `{3} ${plural} → {4} ${items}`],
        answers,
        say: `Each ${single} has ${n} ${items}. Use the numbers in the box to complete the table. ` +
             `${c1} ${plural} have how many ${items}? ${c2} ${plural} have how many ${items}? ` +
             `How many ${plural} have ${fmt(n * c3)} ${items}? And the last row: how many ${plural}, and how many ${items}?`,
        explain: `Each ${single} has ${n} ${items}, so multiply by ${n}: ${c1} × ${n} = ${fmt(n * c1)}, ${c2} × ${n} = ${fmt(n * c2)}, ` +
                 `${c3} × ${n} = ${fmt(n * c3)}, and ${c4} × ${n} = ${fmt(n * c4)}.`
      };
    },

    // 10. About how many? Round to the nearest hundred.
    aboutHowMany() {
      const d = 10 * pick([11, 12, 13, 14, 16, 17, 18, 19]);       // 110-190 days, never 150
      let m;
      do { m = R(310, 890); } while (Math.floor(m / 10) % 10 === 5);
      const rd = Math.round(d / 100) * 100, rm = Math.round(m / 100) * 100;
      const n = pick(NAMES);
      return {
        type: "work",
        prompt: `${n} goes to school ${d} days this year. Each day, ${n} spends ${m} minutes at school. About how many minutes does ${n} spend at school this year?`,
        entries: [{ answer: rd * rm, accept: [d * rm] }],
        explain: `Round to the nearest hundred: ${d} is about ${rd} and ${m} is about ${rm}. ${rd} × ${rm} = ${fmt(rd * rm)}. ` +
                 `(${d} × ${rm} = ${fmt(d * rm)} also counts as a good estimate.)`
      };
    },

    // 12. Which uses properties of operations?
    properties() {
      const a = notRound(12, 39), b = notRound(12, 39);
      const a1 = a - a % 10, a0 = a % 10, b1 = b - b % 10, b0 = b % 10;
      const right = `(${a1} + ${a0}) × (${b1} + ${b0})`;
      const choices = shuffle([right, `${a1} + ${a0} + ${b1} + ${b0}`, `${a1} × ${a0} × ${b1} × ${b0}`, `${a} + ${b}`]);
      return {
        type: "choice",
        prompt: `Which of the following uses properties of operations to help find ${a} × ${b}?`,
        choices, answer: choices.indexOf(right),
        explain: `${a} = ${a1} + ${a0} and ${b} = ${b1} + ${b0}, so ${a} × ${b} is the same as (${a1} + ${a0}) × (${b1} + ${b0}). That's what an area model does. The others add when they should multiply, or multiply every piece together.`
      };
    },

    // 13. 2-digit × a multiple of ten.
    byTens() {
      const a = notRound(12, 98), b = 10 * R(2, 9);
      return {
        type: "work",
        prompt: `Find the product of ${a} × ${b}. Show your work.`,
        answer: a * b,
        explain: `${a} × ${b / 10} = ${fmt(a * b / 10)}. ${b} is ${b / 10} tens, so put a zero on the end: ${fmt(a * b)}.`
      };
    },

    // 14A. Read the table; the asked row is tens × tens.
    dataTable() {
      const names = shuffle(["Transport Truck", "Trusty Wheels", "Cargo Express", "Speedy Vans"]).slice(0, 3);
      const t = 10 * R(2, 9), p = 10 * R(2, 9);
      const rows = names.map((nm, i) => i === 0 ? [nm, t, p] : [nm, notRound(41, 99), notRound(21, 69)]);
      const shown = shuffle(rows);
      const figure = "Company          Trips  Per trip\n" + "─".repeat(32) + "\n" +
        shown.map(([nm, a, b]) => nm.padEnd(16) + String(a).padStart(6) + String(b).padStart(10)).join("\n");
      return {
        type: "work",
        prompt: `The table shows the trips and packages per trip for three delivery companies in one month.\nHow many packages does ${names[0]} deliver?`,
        figure,
        say: `The table shows the trips and packages per trip for three delivery companies in one month. ` +
             shown.map(([nm, a, b]) => `${nm}: ${a} trips, ${b} packages per trip.`).join(" ") +
             ` How many packages does ${names[0]} deliver in the month?`,
        answer: t * p,
        explain: `${names[0]} makes ${t} trips with ${p} packages each time: ${t} × ${p}. Mental math: ${t / 10} × ${p / 10} = ${(t / 10) * (p / 10)}, then add the two zeros: ${fmt(t * p)}.`
      };
    },

    // 16. 2-digit × 2-digit word problem, multiple choice.
    jars() {
      const [thing, holder, holders] = pick([["jars of jam", "box", "boxes"], ["apples", "crate", "crates"], ["seats", "row", "rows"], ["cans of soup", "case", "cases"]]);
      const a = notRound(21, 49), b = notRound(61, 89);
      const unit = " " + thing.split(" ")[0];
      return Object.assign({
        type: "choice", pad: true,
        prompt: `One ${holder} has ${a} ${thing}. How many ${thing} are in ${b} ${holders}?`,
        explain: areaExplain(a, b)
      }, numChoices(a * b, productWrongs(a, b), "", unit));
    },

    // 17. Which number makes the equation true?
    missingBox() {
      const f = R(2, 9), g = R(2, 9), F = f * 10, G = g * pick([10, 100, 1000]), P = F * G;
      const nums = pick([[g, g * 10, g * 100, g * 1000], [g * 10, g * 100, g * 1000, g * 10000]]);
      const zeros = String(F * G).length - String(f * g).length;
      return {
        type: "choice",
        prompt: `Which number makes the equation true?\n${F} × ☐ = ${fmt(P)}`,
        choices: nums.map(fmt), answer: nums.indexOf(G),
        explain: `Basic fact: ${f} × ${g} = ${f * g}. ${F} × ${fmt(G)} = ${fmt(P)}, which is ${f * g} with ${zeros} more zero${zeros === 1 ? "" : "s"}.`
      };
    },

    // 19. Tens × tens word problem.
    tensWord() {
      const n = pick(NAMES), m = 10 * R(2, 9), d = 10 * R(2, 9);
      const c = pick([
        `${n} practices piano for ${m} minutes each day. How many minutes does ${n} practice in ${d} days?`,
        `${n} reads ${m} pages each week. How many pages does ${n} read in ${d} weeks?`,
        `A farm packs ${m} eggs in each crate. How many eggs are in ${d} crates?`,
      ]);
      return {
        type: "work", prompt: c + " Show your method.", answer: m * d,
        explain: `${m / 10} × ${d / 10} = ${(m / 10) * (d / 10)}. Each factor has one zero, so add two zeros: ${fmt(m * d)}.`
      };
    },

    // 20. Hundreds × hundreds (or tens).
    hundreds() {
      const a = R(2, 9), b = R(2, 9), A = a * 100, B = b * pick([10, 100]), k = a * b, P = A * B;
      const E = String(P).length - String(k).length;
      const s = Math.max(0, E - R(0, 3));      // the right answer can be any letter
      const nums = [0, 1, 2, 3].map(i => k * 10 ** (s + i));
      return {
        type: "choice",
        prompt: `Which is the product?\n${fmt(A)} × ${fmt(B)}`,
        choices: nums.map(fmt), answer: nums.indexOf(P),
        explain: `Basic fact: ${a} × ${b} = ${k}. Then add the zeros from both factors: ${fmt(A)} × ${fmt(B)} = ${fmt(P)}.`
      };
    },

    // 21. Standard algorithm, 2-digit × 2-digit.
    standard() {
      const a = notRound(41, 98), b = notRound(41, 98);
      return {
        type: "work",
        prompt: `Use a standard algorithm to find the product.`,
        figure: stack(a, b),
        answer: a * b,
        explain: `${a} × ${b % 10} = ${fmt(a * (b % 10))}. ${a} × ${b - b % 10} = ${fmt(a * (b - b % 10))}. ` +
                 `Add them: ${fmt(a * (b % 10))} + ${fmt(a * (b - b % 10))} = ${fmt(a * b)}.`
      };
    },

    // 22. Name the four partial products in an area model.
    areaParts() {
      let a, b;
      do { a = notRound(11, 19); b = notRound(11, 19); } while (a % 10 === b % 10);
      const a0 = a % 10, b0 = b % 10;
      const figure =
        `          10    +    ${b0}\n` +
        `      ┌─────────┬───────┐\n` +
        `   10 │    A    │   B   │\n` +
        `    + ├─────────┼───────┤\n` +
        `   ${String(a0).padStart(2)} │    C    │   D   │\n` +
        `      └─────────┴───────┘`;
      const n = pick(NAMES);
      return {
        type: "work",
        prompt: `${n} drew an area model to find ${a} × ${b}. Write the partial product for each rectangle in the area model.`,
        figure,
        say: `${n} drew an area model to find ${a} × ${b}. The top is split into 10 and ${b0}. The side is split into 10 and ${a0}. ` +
             `Write the partial product for rectangles A, B, C and D.`,
        entries: [{ label: "A", answer: 100 }, { label: "B", answer: 10 * b0 }, { label: "C", answer: 10 * a0 }, { label: "D", answer: a0 * b0 }],
        explain: `A is 10 × 10 = 100. B is 10 × ${b0} = ${10 * b0}. C is ${a0} × 10 = ${10 * a0}. D is ${a0} × ${b0} = ${a0 * b0}. ` +
                 `Together they make ${a} × ${b} = ${fmt(a * b)}.`
      };
    },

    // 23. Best estimate, 3-digit × 3-digit.
    bestEstimate() {
      for (;;) {
        const three = (lo, hi) => { let n; do { n = R(lo, hi); } while (Math.floor(n / 10) % 10 === 5 || n % 100 === 0); return n; };
        const A = three(120, 880), B = three(220, 880);
        const rA = Math.round(A / 100) * 100, rB = Math.round(B / 100) * 100;
        const est = rA * rB, exact = A * B;
        const wrongs = [(rA + 100) * rB, (rA - 100) * rB, rA * (rB + 100), rA * (rB - 100),
                        (rA + 100) * (rB + 100), (rA - 100) * (rB - 100)]
          .filter(w => w > 0 && w !== est && Math.abs(w - exact) > Math.abs(est - exact));
        if (!splitWrongs(est, wrongs).spots.length) continue;   // only fair wrong answers, or new numbers
        return Object.assign({
          type: "choice", pad: true,
          prompt: `Which is the best estimate for ${A} × ${B}?`,
          explain: `Round each factor to the nearest hundred: ${A} is about ${rA}, and ${B} is about ${rB}. ${rA} × ${rB} = ${fmt(est)}.`
        }, numChoices(est, wrongs));
      }
    },

    // 25. Draw an area model to multiply a teen by a 2-digit number.
    areaModel() {
      const a = notRound(11, 19), b = notRound(21, 98);
      return {
        type: "work",
        prompt: `Draw an area model to multiply ${a} × ${b}.`,
        answer: a * b,
        explain: areaExplain(a, b)
      };
    },

    // 26. Which is the product? 3-digit × 2-digit.
    product3x2() {
      const a = notRound(201, 899), b = notRound(21, 89);
      return Object.assign({
        type: "choice", pad: true,
        prompt: `Which is the product?`,
        figure: stack(a, b),
        explain: areaExplain(a, b)
      }, numChoices(a * b, productWrongs(a, b)));
    },

    // 27. 3-digit × 2-digit word problem.
    factory() {
      const a = notRound(101, 399), b = notRound(21, 59);
      const c = pick([
        `A factory makes ${a} laptops each day. How many laptops does the factory make in ${b} days?`,
        `A bakery sells ${a} bagels each day. How many bagels does the bakery sell in ${b} days?`,
        `A farm packs ${a} boxes of apples each week. How many boxes does the farm pack in ${b} weeks?`,
      ]);
      return { type: "work", prompt: c, answer: a * b, explain: areaExplain(a, b) };
    },
  };

  (window.SETS = window.SETS || {})["evan-math-topic4"] = {
    shuffle: true,
    generate: () => Object.entries(KINDS).map(([kind, make]) => Object.assign(make(), { kind }))
  };
})();
