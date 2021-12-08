const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename).toString("utf8");
console.log("filename:", filename);

let outputs = file.split("\n").map((line) => line.split("|"));

let part2 = 0;
for (let index = 0; index < outputs.length; index++) {
  const output = outputs[index];
  let signals = output[0].split(" ").filter((x) => x !== "");
  let values = output[1].split(" ").filter((x) => x !== "");
  findPatterns(signals, values);
}

function isGivenStringSubsetOfString(string, givenString) {
  const stringOne = string.split("");
  const stringTwo = givenString.split("");
  const result = stringTwo.every((val) => stringOne.includes(val));

  return result;
}

function isGivenStringMathes(string, givenString) {
  const stringOne = string.split("").sort();
  const stringTwo = givenString.split("").sort();
  return JSON.stringify(stringOne) == JSON.stringify(stringTwo);
}
/*
{
  digit: 1,
  patten: "abcd"
}
*/
function findPatterns(inputs, values) {
  let patterns = [];
  // digit 1 is always two segments
  const digitOnePattern = inputs.filter((x) => x.length === 2)[0];
  patterns.push({
    digit: 1,
    pattern: digitOnePattern,
  });

  // digit 4 is always four segments
  const digitFourPattern = inputs.filter((x) => x.length === 4)[0];
  patterns.push({
    digit: 4,
    pattern: digitFourPattern,
  });

  // digit 7 is always three segments
  const digitSevenPattern = inputs.filter((x) => x.length === 3)[0];
  patterns.push({
    digit: 7,
    pattern: digitSevenPattern,
  });

  // digit 8 is always seven segments
  const digitEightPattern = inputs.filter((x) => x.length === 7)[0];
  patterns.push({
    digit: 8,
    pattern: digitEightPattern,
  });

  // digit 9 has six segements and is the superset of digit 4 pattern
  const digitNinePattern = inputs.filter(
    (x) => x.length === 6 && isGivenStringSubsetOfString(x, digitFourPattern)
  )[0];
  patterns.push({
    digit: 9,
    pattern: digitNinePattern,
  });

  // digit 0 has six segments that contains digit 1 pattern and is not digit 9 pattern
  const digitZeroPattern = inputs.filter(
    (x) =>
      x.length === 6 &&
      isGivenStringSubsetOfString(x, digitOnePattern) &&
      x !== digitNinePattern
  )[0];
  patterns.push({
    digit: 0,
    pattern: digitZeroPattern,
  });

  // digit 6 has the only remaining six segments
  const digitSixPattern = inputs.filter(
    (x) => x.length === 6 && x !== digitNinePattern && x !== digitZeroPattern
  )[0];
  patterns.push({
    digit: 6,
    pattern: digitSixPattern,
  });

  // digit 3 has 5 segments that contains digit 7 patterns
  const digitThreePattern = inputs.filter(
    (x) =>
      x.length === 5 &&
      isGivenStringSubsetOfString(x, digitSevenPattern) &&
      isGivenStringSubsetOfString(digitNinePattern, x)
  )[0];
  patterns.push({
    digit: 3,
    pattern: digitThreePattern,
  });

  // digit 5 has 5 segments that is subset of digit 6
  const digitFivePattern = inputs.filter(
    (x) =>
      x.length === 5 &&
      x != digitThreePattern &&
      isGivenStringSubsetOfString(digitNinePattern, x)
  )[0];
  patterns.push({
    digit: 5,
    pattern: digitFivePattern,
  });

  // digit 2 has the only remaining fix segments
  const digitTwoPattern = inputs.filter(
    (x) => x.length === 5 && x !== digitFivePattern && x !== digitThreePattern
  )[0];
  patterns.push({
    digit: 2,
    pattern: digitTwoPattern,
  });

  console.log(patterns);

  const result =
    patterns.filter((x) => isGivenStringMathes(x.pattern, values[0]))[0].digit *
      1000 +
    patterns.filter((x) => isGivenStringMathes(x.pattern, values[1]))[0].digit *
      100 +
    patterns.filter((x) => isGivenStringMathes(x.pattern, values[2]))[0].digit *
      10 +
    patterns.filter((x) => isGivenStringMathes(x.pattern, values[3]))[0].digit;
  console.log(`${values[0]} ${values[1]} ${values[2]} ${values[3]}: ${result}`);
  part2 = part2 + result;
  // console.log(patterns);
}

console.log(`Part 2: ${part2}`);
