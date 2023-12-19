const dijkstra = require("./dijkstra17");
let fs = require("fs");
const input = fs.readFileSync("day17.txt", { encoding: "utf8" });
const data = input.split("\n");
const maxX = data[0].length - 1;
const maxY = data.length - 1;

const getNodeName = (x, y) => {
  return x == 0 && y == 0
    ? "start"
    : x == maxX && y == maxY
    ? "end"
    : "N" + (y * (maxX + 1) + x);
};

let graph = {};
for (let y = 0; y <= maxY; y++) {
  for (let x = 0; x <= maxX; x++) {
    let name = getNodeName(x, y);
    let node = {};
    // find neighbors
    // up
    if (y - 1 >= 0) node[getNodeName(x, y - 1)] = parseInt(data[y - 1][x]);
    // right
    if (x + 1 <= maxX) node[getNodeName(x + 1, y)] = parseInt(data[y][x + 1]);
    // down
    if (y + 1 <= maxY) node[getNodeName(x, y + 1)] = parseInt(data[y + 1][x]);
    // left
    if (x - 1 >= 0) node[getNodeName(x - 1, y)] = parseInt(data[y][x - 1]);

    graph[name] = node;
  }
}

console.time("silver");
console.log(
  "silver:",
  dijkstra.findShortestPath(graph, "start", "end", maxX).distance
);
