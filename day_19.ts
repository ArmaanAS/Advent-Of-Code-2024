// const text = `\
// r, wr, b, g, bwu, rb, gb, br

// brwrr
// bggr
// gbbr
// rrbgbr
// ubwu
// bwurrg
// brgr
// bbrgwb`;
const text = await Deno.readTextFile("./day_19.txt");

const [optionsRaw, _, ...towels] = text.split("\n");
const options = new Set(optionsRaw.split(", "));

const cache = new Map<string, number>();
// for (const col of "wubrg") {
//   cache.set(col, 0);
// }
// for (const opt of options) {
//   cache.set(opt, 1);
// }
for (const opt of [...options].sort((a, b) => a.length - b.length)) {
  console.log(opt);
  getCombos(opt);
}

console.log(cache);

function getCombos(stripes: string) {
  // console.log(stripes);
  if (cache.has(stripes)) {
    // console.log(stripes, cache.get(stripes));
    return cache.get(stripes)!;
  }
  // if (stripes.length === 1) {
  //   cache.set(stripes, 0);
  //   // console.log("Set", stripes, false);
  //   return false;
  // }
  let combos = 0;
  for (let i = 1; i <= stripes.length; i++) {
    const start = stripes.slice(0, i);

    if (!options.has(start)) continue;
    // console.log(i, start);

    const rest = stripes.slice(i);

    const count = rest ? getCombos(rest) : 1;

    // cache.set(stripes, true);
    // console.log("Set", stripes, true);
    // return true;
    combos += count;
  }

  // console.log(stripes, combos);
  cache.set(stripes, combos);
  // console.log(cache);
  return combos;
  // cache.set(stripes, false);
  // console.log("Set", stripes, false);
  // return false;
}

let possible = 0;
let combos = 0;
for (const towel of towels) {
  const count = getCombos(towel);
  combos += count;
  if (count) possible += 1;
  console.log("Combos for", towel, "is", count);
}

console.log({ possible });
console.log({ combos });
