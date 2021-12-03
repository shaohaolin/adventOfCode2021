const fs = require("fs");
const filename = process.argv[2];
const file = fs.readFileSync(filename).toString("utf8");
console.log("filename:", filename);

const convertBits = [];
const reports = file
  .split("\n")
  .map((line) => line.split("").map((bit) => parseInt(bit, 2)));

const bitLength = reports[0].length;
const transpose = reports[0].map((_, colIndex) =>
  reports.map((row) => row[colIndex])
);
const temp = reports.map((bits) =>
  bits.map((bit, index) => {
    if (convertBits[index] !== undefined) {
      convertBits[index].push(bit);
    } else {
      convertBits.push([bit]);
    }
  })
);

var gamma = convertBits.map((convertBit) => {
  const numOfOne = convertBit.filter((bit) => bit === 1).length;
  const numOfZero = convertBit.filter((bit) => bit === 0).length;
  return numOfOne > numOfZero ? 1 : 0;
});

var epsilon = convertBits
  .map((convertBit) => {
    const numOfOne = convertBit.filter((bit) => bit === 1).length;
    const numOfZero = convertBit.filter((bit) => bit === 0).length;
    return numOfOne < numOfZero ? 1 : 0;
  })
  .join("");

// console.log(reports);
// console.log(convertBits);
// console.log(gamma);

// console.log("Part 1 =", parseInt(gamma, 2) * parseInt(epsilon, 2));
// let matches = reports;
// gamma.map((value, index) => {
//   matches = matches.filter((report) => report[index] === value);
//   console.log(`index: ${index} value: ${value} \n ${JSON.stringify(matches)}`);
// });
// console.log(`bit length: ${bitLength}`);
// console.log(matches);

// function findMostCommondBitValue(array) {}

// let matches = reports;

// transpose
// const transposeMatches = reports[0].map((_, colIndex) =>
//   reports.map((row) => row[colIndex])
// );

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

let matches = reports;
for (let index = 0; index < bitLength; index++) {
  var transposeArray = transposeMatches(matches);
  var mostCommonValue = findMostCommonValue(transposeArray[index]);
  console.log(`mostCommonValue:  ${mostCommonValue}`);
  matches = filterResultMatchesGivenValue(matches, index, mostCommonValue);
}
console.log(matches);
var o2 = parseInt(matches[0].join(""), 2);

matches = reports;
for (let index = 0; index < bitLength; index++) {
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
console.log("Part 2 =", o2 * co2);
