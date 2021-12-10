const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename).toString("utf8");
console.log("filename:", filename);

const inputs = file.split("\n").map((line) => line.split(""));

let score = 0;

for (let index = 0; index < inputs.length; index++) {
  const row = inputs[index];
  let queue = [];
  for (let colIndex = 0; colIndex < row.length; colIndex++) {
    const element = row[colIndex];
    if (
      (element === "(") |
      (element === "[") |
      (element === "{") |
      (element === "<")
    ) {
      queue.push(element);
    } else {
      const openElement = queue.pop();
      if (isMatchExpectedElement(element, openElement)) {
        continue;
      } else {
        console.log(`Expected ${openElement} but found ${element} instead.`);
        score = score + calculateScore(element);
      }
    }
  }
}

console.log(`part 1 score: ${score}`);

function isMatchExpectedElement(givenElement, openElement) {
  if (openElement === "(") {
    return givenElement === ")";
  }
  if (openElement === "[") {
    return givenElement === "]";
  }
  if (openElement === "{") {
    return givenElement === "}";
  }
  if (openElement === "<") {
    return givenElement === ">";
  }
}
function calculateScore(givenElement) {
  if (givenElement === ")") {
    return 3;
  }
  if (givenElement === "]") {
    return 57;
  }
  if (givenElement === "}") {
    return 1197;
  }
  if (givenElement === ">") {
    return 25137;
  }
}
