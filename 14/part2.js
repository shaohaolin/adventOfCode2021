import { readFileSync } from "fs";

const filename = process.argv[2];
const file = readFileSync(filename).toString("utf8");
console.log("filename:", filename);

const start = process.hrtime.bigint();

const inputs = file.split("\n").filter((line) => line !== "");
const template = inputs.shift().split("");

// remove the ''
const pairInsertion = inputs.slice(0);

const pairs = new Map();
pairInsertion
  .map((line) => line.split(" -> "))
  .map(([key, value]) => pairs.set(key, value));

let pairCounts = {};
for (let index = 0; index < template.length - 1; index++) {
  const pair = template[index] + template[index + 1];
  pairCounts[pair] = (pairCounts[pair] || 0) + 1;
}

for (let step = 0; step < 40; step++) {
  let newPairCounts = {};
  Object.keys(pairCounts).map((pair) => {
    if (!pairs.get(pair)) {
      newPairCounts[pair] = pairCounts[pair];
    } else {
      const [left, right] = pair.split("");
      const leftPair = left + pairs.get(pair);
      const rightPair = pairs.get(pair) + right;
      newPairCounts[leftPair] =
        (newPairCounts[leftPair] || 0) + pairCounts[pair];
      newPairCounts[rightPair] =
        (newPairCounts[rightPair] || 0) + pairCounts[pair];
    }
  });
  pairCounts = newPairCounts;
}

const counts = {};
counts[template[0]] = 1;
Object.keys(pairCounts).map((pair) => {
  const [_left, right] = pair.split("");
  counts[right]
    ? (counts[right] += pairCounts[pair])
    : (counts[right] = pairCounts[pair]);
});

const sortedCounts = Object.values(counts).sort((a, b) => a - b);
console.log(sortedCounts[sortedCounts.length - 1] - sortedCounts[0]);

const time = process.hrtime.bigint() - start;
console.log(`\nAnswers found in ${time / 1000000n}ms`);
