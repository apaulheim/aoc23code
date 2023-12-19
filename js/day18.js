let fs = require("fs");
const input = fs.readFileSync("day18.txt", { encoding: "utf8" });
const data = input.split("\n");
const dirRegex = /[UDLR]\s\d+/g;
const lineRegex = /[#]+/g;
const directions = data
  .map((line) => line.match(dirRegex))
  .map((direction) => {
    let [dir, distStr] = direction[0].split(" ");
    let dist = parseInt(distStr);
    let x = dir == "R" ? dist : dir == "L" ? -dist : 0;
    let y = dir == "D" ? dist : dir == "U" ? -dist : 0;
    return { x, y };
  });
const gridWidth = 1000;
const grid = [];
for (let i = 0; i < gridWidth; i++) {
  for (let j = 0; j < gridWidth; j++) {
    if (!grid[j]) grid[j] = [];
    grid[j][i] = ".";
  }
}

let x = gridWidth / 2;
let y = gridWidth / 2;

const getPipe = (current, next) => {
  if (next == null) return "#";
  if (current.y != 0 && next.y != 0) return "|";
  else if (current.x != 0 && next.x != 0) return "-";
  else if ((current.x > 0 && next.y > 0) || (current.y < 0 && next.x < 0))
    return "7";
  else if ((current.y > 0 && next.x < 0) || (current.x > 0 && next.y < 0))
    return "J";
  else if ((current.x < 0 && next.y > 0) || (current.y < 0 && next.x > 0))
    return "F";
  else if ((current.y > 0 && next.x > 0) || (current.x < 0 && next.y < 0))
    return "L";
  else return "#";
};

let contur = 0;
for (let i = 0; i < directions.length; i++) {
  let direction = directions[i];
  for (let j = 0; j < Math.abs(direction.x); j++) {
    x += direction.x > 0 ? 1 : -1;
    grid[y][x] = getPipe(
      direction,
      j == Math.abs(direction.x) - 1 ? directions[i + 1] : directions
    );
    contur++;
  }
  for (let j = 0; j < Math.abs(direction.y); j++) {
    y += direction.y > 0 ? 1 : -1;
    grid[y][x] = getPipe(
      direction,
      j == Math.abs(direction.y) - 1 ? directions[i + 1] : directions
    );
    contur++;
  }
}

const printGrid = (grid) => {
  for (let row of grid) {
    console.log(row.join(""));
  }
};

const writeToFile = (grid) => {
  let file = fs.createWriteStream("day18grid.txt");
  file.on("error", function (err) {
    console.log(err);
  });
  grid.forEach(function (v) {
    file.write(v.join("") + "\n");
  });
  file.end();
};

let northFacingRegex = /[\|LJ]/g;
let inside = 0;
for (let y = 0; y < grid.length; y++) {
  let row = grid[y].join("");
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] == ".") {
      let numPipes = [...row.substring(0, x).matchAll(northFacingRegex)].length;
      if (numPipes % 2 == 1) {
        inside++;
      }
    }
  }
}

// printGrid(grid)
writeToFile(grid);
console.log("silver", inside + contur);
