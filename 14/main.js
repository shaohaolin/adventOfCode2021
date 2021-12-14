import { readFileSync } from "fs";

const filename = process.argv[2];
const file = readFileSync(filename).toString("utf8");
console.log("filename:", filename);

const start = process.hrtime.bigint();

const inputs = file.split("\n").filter((line) => line !== "");
let inputTemplate = inputs[0].split("");
const pairInsertion = inputs.slice(1);

const insertionMap = new Map();
pairInsertion
  .map((line) => line.split(" -> "))
  .map(([key, value]) => insertionMap.set(key, value));

function polymerInsertion(template) {
  let result = "";
  for (let index = 0; index < template.length - 1; index++) {
    const firstElement = template[index];
    const secondElement = template[index + 1];
    const key = firstElement + secondElement;
    if (insertionMap.get(key)) {
      result = result + firstElement + insertionMap.get(key);
    } else {
      result = result + firstElement;
    }
  }
  result += template[template.length - 1];
  // console.log(result);
  return result;
}

for (let index = 0; index < 10; index++) {
  inputTemplate = polymerInsertion(inputTemplate);
}

const counter = {};
inputTemplate.split("").map((x) => {
  if (counter[x] === undefined) {
    counter[x] = 1;
  } else {
    counter[x]++;
  }
});

const entries = Object.entries(counter).sort((a, b) => a[1] - b[1]);
const delta = entries[entries.length - 1][1] - entries[0][1];
console.log(delta);

const time = process.hrtime.bigint() - start;
console.log(`\nAnswers found in ${time / 1000000n}ms`);
