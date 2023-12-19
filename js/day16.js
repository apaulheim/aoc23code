let fs = require("fs");

const input = fs.readFileSync("day16.txt", { encoding: "utf8" });
const data = input.split("\n");
const maxX = data[0].length;
const maxY = data.length;

let energizedTiles = new Set();
let inputs = new Set();

function beamOn(beforeX, beforeY, dirx, diry) {
  energizedTiles.add(`${beforeX},${beforeY}`);
  const x = beforeX + dirx;
  const y = beforeY + diry;
  if (
    inputs.has(`${beforeX},${beforeY}, ${dirx},${diry}`) ||
    x < 0 ||
    y < 0 ||
    x >= maxX ||
    y >= maxY
  ) {
    return;
  }
  inputs.add(`${beforeX},${beforeY}, ${dirx},${diry}`);
  switch (data[y][x]) {
    case ".":
      beamOn(x, y, dirx, diry);
      break;
    case "/":
      beamOn(x, y, -diry, -dirx);
      break;
    case "\\":
      beamOn(x, y, diry, dirx);
      break;
    case "-":
      if (diry == 0) {
        beamOn(x, y, dirx, diry);
      } else {
        beamOn(x, y, -1, 0);
        beamOn(x, y, 1, 0);
      }
      break;
    case "|":
      if (dirx == 0) {
        beamOn(x, y, dirx, diry);
      } else {
        beamOn(x, y, 0, -1);
        beamOn(x, y, 0, 1);
      }
      break;
  }
}

beamOn(-1, 0, 1, 0);
console.log("silver:", energizedTiles.size - 1);

// Part 2
let maxEnergizedTiles = 0;
for (let x = 0; x < maxX; x++) {
  energizedTiles = new Set();
  inputs = new Set();
  beamOn(x, -1, 0, 1);
  maxEnergizedTiles = Math.max(maxEnergizedTiles, energizedTiles.size - 1);
  energizedTiles = new Set();
  inputs = new Set();
  beamOn(x, maxY, 0, -1);
  maxEnergizedTiles = Math.max(maxEnergizedTiles, energizedTiles.size - 1);
}
for (let y = 0; y < maxY; y++) {
  energizedTiles = new Set();
  inputs = new Set();
  beamOn(-1, y, 1, 0);
  maxEnergizedTiles = Math.max(maxEnergizedTiles, energizedTiles.size - 1);
  energizedTiles = new Set();
  inputs = new Set();
  beamOn(maxX, y, -1, 0);
  maxEnergizedTiles = Math.max(maxEnergizedTiles, energizedTiles.size - 1);
}
console.log("gold", maxEnergizedTiles);
