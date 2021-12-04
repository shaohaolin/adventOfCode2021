const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename).toString("utf8");
console.log("filename:", filename);

const bits = file
  .split("\n")
  .map((line) => line.split("").map((bit) => parseInt(bit, 2)));
const transpose = bits[0].map((_, colIndex) =>
  bits.map((row) => row[colIndex])
);
const bitsLength = bits[0].length;

var gamma = transpose
  .map((bits) => {
    const numOfOne = bits.filter((bit) => bit === 1).length;
    const numOfZero = bits.filter((bit) => bit === 0).length;
    return numOfOne > numOfZero ? 1 : 0;
  })
  .join("");

var epsilon = transpose
  .map((bits) => {
    const numOfOne = bits.filter((bit) => bit === 1).length;
    const numOfZero = bits.filter((bit) => bit === 0).length;
    return numOfOne < numOfZero ? 1 : 0;
  })
  .join("");

console.log(gamma);
console.log(epsilon);
let matches = bits;

function transposeMatches(matches) {
  const transpose = matches[0].map((_, colIndex) =>
    matches.map((row) => row[colIndex])
  );

  return transpose;
}

// find the most common value by given index
function findMostCommonValue(array) {
  const numOfOne = array.filter((bit) => bit === 1).length;
  const numOfZero = array.filter((bit) => bit === 0).length;
  return numOfOne >= numOfZero ? 1 : 0;
}

// find the least common value by given index
function findLeastCommonValue(array) {
  const numOfOne = array.filter((bit) => bit === 1).length;
  const numOfZero = array.filter((bit) => bit === 0).length;
  return numOfZero <= numOfOne ? 0 : 1;
}

function filterResultMatchesGivenValue(array, index, commonValue) {
  return array.filter((array) => array[index] === commonValue);
}

matches = bits;
for (let index = 0; index < bitsLength; index++) {
  var transposeArray = transposeMatches(matches);
  var mostCommonValue = findMostCommonValue(transposeArray[index]);
  console.log(`mostCommonValue:  ${mostCommonValue}`);
  matches = filterResultMatchesGivenValue(matches, index, mostCommonValue);
}
console.log(matches);
var o2 = parseInt(matches[0].join(""), 2);

matches = bits;
for (let index = 0; index < bitsLength; index++) {
  var transposeArray = transposeMatches(matches);
  var leastCommonValue = findLeastCommonValue(transposeArray[index]);
  console.log(`leastCommonValue:  ${leastCommonValue}`);
  matches = filterResultMatchesGivenValue(matches, index, leastCommonValue);
  if (matches.length === 1) {
    break;
  }
  // console.log(matches);
}

var co2 = parseInt(matches[0].join(""), 2);
console.log(`o2: ${o2}`);
console.log(`co2: ${co2}`);
console.log("Part 1 =", parseInt(gamma, 2) * parseInt(epsilon, 2));
console.log("Part 2 =", o2 * co2);
