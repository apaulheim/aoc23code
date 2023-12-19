// return whether the last three nodes in the visited array are in the same direction
// if so, return the direction
// if not, return null
const lastThreeInSameDirection = (visited, maxX) => {
  if (visited.length < 3) return null;
  let lastThree = visited.slice(-3).map((node) => parseInt(node.substring(1)));
  // left
  if (lastThree[2] == lastThree[1] - 1 && lastThree[1] == lastThree[0] - 1) {
    return { x: -1, y: 0 };
  }
  // right
  else if (
    lastThree[1] == lastThree[0] + 1 &&
    lastThree[2] == lastThree[1] + 1
  ) {
    return { x: 1, y: 0 };
  }
  // up
  else if (
    lastThree[2] == lastThree[1] - (maxX + 1) &&
    lastThree[1] == lastThree[0] - (maxX + 1)
  ) {
    return { x: 0, y: -1 };
  }
  // down
  else if (
    lastThree[1] == lastThree[0] + (maxX + 1) &&
    lastThree[2] == lastThree[1] + (maxX + 1)
  ) {
    return { x: 0, y: 1 };
  } else {
    return null;
  }
};

const shortestDistanceNode = (currentNode, distances, visited, maxX) => {
  let shortest = null;
  let direction = lastThreeInSameDirection(visited, maxX);
  console.log(currentNode, visited.slice(-3));
  if (direction != null) {
    const current = parseInt(currentNode.substring(1));
    let nodeToExclude = current + direction.x + direction.y * (maxX + 1);
    for (let node in distances) {
      if (node == "N" + nodeToExclude) continue;
      let currentIsShortest =
        shortest === null || distances[node] < distances[shortest];
      if (currentIsShortest && !visited.includes(node)) {
        shortest = node;
      }
    }
  } else {
    for (let node in distances) {
      let currentIsShortest =
        shortest === null || distances[node] < distances[shortest];
      if (currentIsShortest && !visited.includes(node)) {
        shortest = node;
      }
    }
  }
  return shortest;
};

exports.findShortestPath = (graph, startNode, endNode, maxX) => {
  // establish object for recording distances from the start node
  let distances = {};
  distances[endNode] = "Infinity";
  distances = Object.assign(distances, graph[startNode]);

  // track paths
  let parents = { endNode: null };
  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  // track nodes that have already been visited
  let visited = [];

  // find the nearest node
  let node = shortestDistanceNode(startNode, distances, visited, maxX);

  // for that node
  while (node) {
    // find its distance from the start node & its child nodes
    let distance = distances[node];
    let children = graph[node];
    // for each of those child nodes
    for (let child in children) {
      // make sure each child node is not the start node
      if (String(child) === String(startNode)) {
        continue;
      } else {
        // save the distance from the start node to the child node
        let newdistance = distance + children[child];
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        // save the distance to the object
        // record the path
        if (!distances[child] || distances[child] > newdistance) {
          distances[child] = newdistance;
          parents[child] = node;
        }
      }
    }
    // move the node to the visited set
    visited.push(node);
    // move to the nearest neighbor node
    node = shortestDistanceNode(node, distances, visited, maxX);
  }

  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  // return the shortest path from start node to end node & its distance
  let results = {
    distance: distances[endNode],
    path: shortestPath,
  };

  return results;
};
