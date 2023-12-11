const exp = require("constants");
let fs = require("fs");

const input = fs.readFileSync("day11.txt", { encoding: "utf8" });
const dataStrs = input.split("\n");

function getGalaxies(data) {
  let galaxies = [];
  let galaxyId = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      if (data[y][x] == "#") {
        galaxies.push({ id: galaxyId, x: x, y: y });
        galaxyId++;
      }
    }
  }
  return galaxies;
}

function pairGalaxies(galaxies) {
  // create unique pairs of galaxies
  let pairs = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      pairs.push([galaxies[i], galaxies[j]]);
    }
  }
  return pairs;
}

function expandSpace(data) {
  const expandedRows = new Set();
  const expandedColumns = new Set();
  // expand rows
  for (let y = 0; y < data.length; y++) {
    if (data[y].every((col) => col == ".")) {
      expandedRows.add(y);
    }
  }
  // expand columns
  for (let x = 0; x < data[0].length; x++) {
    if (data.every((row) => row[x] == ".")) {
      expandedColumns.add(x);
    }
  }
  return [expandedRows, expandedColumns];
}

function numberOfExpandedRows(v1, v2, expandedRows) {
  const [y1, y2] = [v1, v2].sort((a, b) => a - b);
  let count = 0;
  for (let y = y1 + 1; y < y2; y++) {
    if (expandedRows.has(y)) {
      count++;
    }
  }
  return count;
}

function numberOfExpandedColumns(v1, v2, expandedColumns) {
  const [x1, x2] = [v1, v2].sort((a, b) => a - b);
  let count = 0;
  for (let x = x1 + 1; x < x2; x++) {
    if (expandedColumns.has(x)) {
      count++;
    }
  }
  return count;
}

function shortestPath(pair, expandedRows, expandedColumns, expandBy) {
  let x1 = pair[0].x;
  let y1 = pair[0].y;
  let x2 = pair[1].x;
  let y2 = pair[1].y;
  let dx = x2 - x1;
  let dy = y2 - y1;
  const expandedRowsInRange = numberOfExpandedRows(y1, y2, expandedRows);
  const expandedColumnsInRange = numberOfExpandedColumns(
    x1,
    x2,
    expandedColumns
  );
  return (
    Math.abs(dx) +
    Math.abs(dy) +
    expandedRowsInRange * expandBy -
    expandedRowsInRange +
    expandedColumnsInRange * expandBy -
    expandedColumnsInRange
  );
}

function resolve() {
  const data = dataStrs.map((row) => row.split(""));
  const [expandedRows, expandedColumns] = expandSpace(data);
  let galaxies = getGalaxies(data);
  let pairs = pairGalaxies(galaxies);
  let silver = pairs.reduce(
    (acc, pair) => acc + shortestPath(pair, expandedRows, expandedColumns, 2),
    0
  );
  console.log("silver", silver);
  let gold = pairs.reduce(
    (acc, pair) =>
      acc + shortestPath(pair, expandedRows, expandedColumns, 1000000),
    0
  );
  console.log("gold", gold);
}

resolve();
