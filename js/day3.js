let fs = require("fs");
const { parse } = require("path");

const input = fs.readFileSync("day3.txt", { encoding: "utf8" });
const lines = input.split("\r\n");

const numberPositions = new Map();
const symbolPositions = new Set();
let numberRegex = /(\d+)/g;
let symbolRegex = /[^0-9\.]/g;
lines.forEach((line, y) => {
  [...line.matchAll(numberRegex)].forEach((match) => {
    numberPositions.set(`${match.index},${y}`, {
      number: parseInt(match[0]),
      length: match[0].length,
    });
  });
  [...line.matchAll(symbolRegex)].forEach((match) => {
    symbolPositions.add(`${match.index},${y}`);
  });
});

function hasAdjecentSymbol(position, numberData) {
  let [x, y] = position.split(",");
  x = parseInt(x);
  y = parseInt(y);
  let adjecentPositions = [];
  for (i = x - 1; i < x + numberData.length + 1; i++) {
    adjecentPositions.push(`${i},${y - 1}`);
    adjecentPositions.push(`${i},${y}`);
    adjecentPositions.push(`${i},${y + 1}`);
  }
  return adjecentPositions.some((pos) => symbolPositions.has(pos));
}

let silver = 0;
numberPositions.forEach((numberData, position) => {
  if (hasAdjecentSymbol(position, numberData)) {
    silver += numberData.number;
  }
});
console.log("silver", silver);

// PART 2
let gearRegex = /\*/g;
const goldNumberPositions = new Map();
const gearPositions = new Set();
let uniqueId = 0;
lines.forEach((line, y) => {
  [...line.matchAll(numberRegex)].forEach((match) => {
    for (let i = match.index; i < match.index + match[0].length; i++) {
      goldNumberPositions.set(`${i},${y}`, {
        number: parseInt(match[0]),
        id: uniqueId,
      });
    }
    uniqueId++;
  });
  [...line.matchAll(gearRegex)].forEach((match) => {
    gearPositions.add(`${match.index},${y}`);
  });
});

function isGear(position) {
  const adjecentPartNumbers = new Map();
  let [x, y] = position.split(",");
  x = parseInt(x);
  y = parseInt(y);
  for (i = x - 1; i <= x + 1; i++) {
    for (j = y - 1; j <= y + 1; j++) {
      if (goldNumberPositions.has(`${i},${j}`)) {
        let numberData = goldNumberPositions.get(`${i},${j}`);
        adjecentPartNumbers.set(numberData.id, numberData.number);
      }
    }
  }
  let partNumbers = [...adjecentPartNumbers.values()];
  if (partNumbers.length == 2) {
    return partNumbers[0] * partNumbers[1];
  }
  return 0;
}

let gold = 0;
gearPositions.forEach((position) => {
  gold += isGear(position);
});

console.log("gold", gold);
