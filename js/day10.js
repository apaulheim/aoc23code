let fs = require("fs");

const input = fs.readFileSync("day10.txt", { encoding: "utf8" });
const data = input.split("\r\n");

function inRange(x, y, data) {
  return x >= 0 && x < data[0].length && y >= 0 && y < data.length;
}

function findConnectedPositionsStart(x, y, data) {
  let connectedPositions = [];
  // north
  if (
    inRange(x, y - 1, data) &&
    (data[y - 1][x] == "|" || data[y - 1][x] == "7" || data[y - 1][x] == "F")
  )
    connectedPositions.push([x, y - 1]);
  // east
  if (
    inRange(x + 1, y, data) &&
    (data[y][x + 1] == "-" || data[y][x + 1] == "J" || data[y][x + 1] == "7")
  )
    connectedPositions.push([x + 1, y]);
  // south
  if (
    inRange(x, y + 1, data) &&
    (data[y + 1][x] == "|" || data[y + 1][x] == "L" || data[y + 1][x] == "J")
  )
    connectedPositions.push([x, y + 1]);
  // west
  if (
    inRange(x - 1, y, data) &&
    (data[y][x - 1] == "-" || data[y][x - 1] == "F" || data[y][x - 1] == "L")
  )
    connectedPositions.push([x - 1, y]);
  return connectedPositions;
}

function findConnectedPositions(x, y, data) {
  let connectedPositions = [];
  switch (data[y][x]) {
    case "|":
      connectedPositions.push([x, y - 1]);
      connectedPositions.push([x, y + 1]);
      break;
    case "-":
      connectedPositions.push([x - 1, y]);
      connectedPositions.push([x + 1, y]);
      break;
    case "L":
      connectedPositions.push([x, y - 1]);
      connectedPositions.push([x + 1, y]);
      break;
    case "J":
      connectedPositions.push([x, y - 1]);
      connectedPositions.push([x - 1, y]);
      break;
    case "7":
      connectedPositions.push([x, y + 1]);
      connectedPositions.push([x - 1, y]);
      break;
    case "F":
      connectedPositions.push([x, y + 1]);
      connectedPositions.push([x + 1, y]);
      break;
    case "S":
      connectedPositions = findConnectedPositionsStart(x, y, data);
      break;
  }
  return connectedPositions;
}

function findNextPosition(x, y, data, beforeX, beforeY) {
  let connectedPositions = findConnectedPositions(x, y, data);
  let nextPosition = connectedPositions.find(
    (position) => position[0] != beforeX || position[1] != beforeY
  );
  return nextPosition;
}

function findStartPosition(data) {
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] == "S") {
        return [x, y];
      }
    }
  }
}

function part1() {
  let [x, y] = findStartPosition(data);
  let startX = x;
  let startY = y;
  let beforeX = x;
  let beforeY = y;
  let nextPosition = findNextPosition(x, y, data, beforeX, beforeY);
  let steps = 1;
  while (!(nextPosition[0] == startX && nextPosition[1] == startY)) {
    beforeX = x;
    beforeY = y;
    x = nextPosition[0];
    y = nextPosition[1];
    nextPosition = findNextPosition(x, y, data, beforeX, beforeY);
    steps++;
  }
  return steps / 2;
}

console.log("silver", part1());

function printData(data) {
  for (let y = 0; y < data.length; y++) {
    let row = "";
    for (let x = 0; x < data[y].length; x++) {
      row += data[y][x];
    }
    console.log(row);
  }
}

function part2() {
  // copy of data to mark visited positions
  let data2 = [];
  for (let y = 0; y < data.length; y++) {
    let row = [];
    for (let x = 0; x < data[y].length; x++) {
      row.push(".");
    }
    data2.push(row);
  }
  let [x, y] = findStartPosition(data);
  let startX = x;
  let startY = y;
  data2[y][x] = "S";
  let beforeX = x;
  let beforeY = y;
  let beforeI = "LEFT";
  let nextPosition = findNextPosition(x, y, data, beforeX, beforeY);
  let steps = 1;
  while (!(nextPosition[0] == startX && nextPosition[1] == startY)) {
    beforeX = x;
    beforeY = y;
    x = nextPosition[0];
    y = nextPosition[1];
    data2[y][x] = data[y][x];
    nextPosition = findNextPosition(x, y, data, beforeX, beforeY);
    steps++;
  }
  //   printData(data2);
  let northFacingRegex = /[\|LJ]/g;
  let inside = 0;
  for (let y = 0; y < data2.length; y++) {
    let row = data2[y].join("");
    for (let x = 0; x < data2[y].length; x++) {
      if (data2[y][x] == ".") {
        let numPipes = [...row.substring(0, x).matchAll(northFacingRegex)]
          .length;
        if (numPipes % 2 == 1) {
          inside++;
        }
      }
    }
  }
  console.log("gold", inside);
}

part2();
