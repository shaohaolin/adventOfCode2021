const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename).toString("utf8");
console.log("filename:", filename);

const inputs = file.split("\n").map((line) => line.split(""));

let scores = [];

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
      }
    }
  }

  let score = 0;
  // pop the queue
  while (queue.length > 0) {
    const openElement = queue.pop();
    score = score * 5 + calculateScore(openElement);
  }
  scores.push(score);
}

console.log(`part 2 score: ${scores.sort(desceding)[scores.length / 2 + 1]}`);

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
  if (givenElement === "(") {
    return 1;
  }
  if (givenElement === "[") {
    return 2;
  }
  if (givenElement === "{") {
    return 3;
  }
  if (givenElement === "<") {
    return 4;
  }
}

function desceding(a, b) {
  if (a - b > 0) {
    return 1;
  } else if (a - b < 0) {
    return -1;
  } else {
    return 0;
  }
}
