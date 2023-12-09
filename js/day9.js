let fs = require("fs");

const input = fs.readFileSync("day9.txt", { encoding: "utf8" });
const dataStr = input.split("\r\n");
let regex = /-?\d+/g;
const data = dataStr.map((line) =>
  [...line.matchAll(regex)].map((match) => parseInt(match[0]))
);

function findNextHistoryValue(history) {
  let differences = [];
  let lastArray = history;
  differences.push(lastArray);
  while (!lastArray.every((value) => value == 0)) {
    let nextArray = [];
    for (let i = 1; i < lastArray.length; i++) {
      nextArray.push(lastArray[i] - lastArray[i - 1]);
    }
    differences.push(nextArray);
    lastArray = nextArray;
  }
  let nextHistoryValue = 0;
  for (let i = differences.length - 1; i > 0; i--) {
    nextHistoryValue += differences[i - 1][differences[i - 1].length - 1];
  }
  return nextHistoryValue;
}

console.log(
  "silver",
  data.reduce((acc, val) => acc + findNextHistoryValue(val), 0)
);

function findPreviousHistoryValue(history) {
  let differences = [];
  let lastArray = history;
  differences.push(lastArray);
  while (!lastArray.every((value) => value == 0)) {
    let nextArray = [];
    for (let i = 1; i < lastArray.length; i++) {
      nextArray.push(lastArray[i] - lastArray[i - 1]);
    }
    differences.push(nextArray);
    lastArray = nextArray;
  }
  let previousHistoryValue = 0;
  for (let i = differences.length - 1; i > 0; i--) {
    previousHistoryValue = differences[i - 1][0] - previousHistoryValue;
  }
  return previousHistoryValue;
}

console.log(
  "gold",
  data.reduce((acc, val) => acc + findPreviousHistoryValue(val), 0)
);
