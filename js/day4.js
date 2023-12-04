let fs = require("fs");

const input = fs.readFileSync("day4.txt", { encoding: "utf8" });
const lines = input.split("\r\n");

function intersection(set1, set2) {
  let result = new Set();
  for (let elem of set2) {
    if (set1.has(elem)) {
      result.add(elem);
    }
  }
  return result;
}

function getMatchingCards(line) {
  const [_, draw] = line.split(": ");
  const [winStr, haveStr] = draw.split(" | ");
  let numberRegex = /(\d+)/g;
  const win = [...winStr.matchAll(numberRegex)]
    .map((match) => parseInt(match[0]))
    .reduce((acc, num) => {
      acc.add(num);
      return acc;
    }, new Set());
  const have = [...haveStr.matchAll(numberRegex)]
    .map((match) => parseInt(match[0]))
    .reduce((acc, num) => {
      acc.add(num);
      return acc;
    }, new Set());
  const numWinning = intersection(have, win).size;
  if (numWinning > 0) return Math.pow(2, numWinning - 1);
  else return 0;
}

let silver = 0;
lines.forEach((line) => {
  silver += getMatchingCards(line);
});
console.log("silver", silver);

// PART 2
function getNumberOfMatchingCards(line) {
  const [_, draw] = line.split(": ");
  const [winStr, haveStr] = draw.split(" | ");
  let numberRegex = /(\d+)/g;
  const win = [...winStr.matchAll(numberRegex)]
    .map((match) => parseInt(match[0]))
    .reduce((acc, num) => {
      acc.add(num);
      return acc;
    }, new Set());
  const have = [...haveStr.matchAll(numberRegex)]
    .map((match) => parseInt(match[0]))
    .reduce((acc, num) => {
      acc.add(num);
      return acc;
    }, new Set());
  const numWinning = intersection(have, win).size;
  return numWinning;
}
let cards = [];
for (let i = 0; i < lines.length; i++) {
  cards.push(1);
}

for (let i = 0; i < lines.length; i++) {
  let numMatching = getNumberOfMatchingCards(lines[i]);
  for (let k = 0; k < cards[i]; k++) {
    for (let j = i + 1; j < i + 1 + numMatching && j < cards.length; j++) {
      cards[j] += 1;
    }
  }
}
let gold = cards.reduce((acc, num) => acc + num, 0);
console.log(gold);
