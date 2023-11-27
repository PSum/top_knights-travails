class Node {
  constructor(x, y, parent = null, g = 0, h = 0) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.g = g;
    this.h = h;
    this.f = g + h;
  }
}

function astar(start, end) {
  const startNode = new Node(start[0], start[1]);
  const endNode = new Node(end[0], end[1]);

  let openList = [startNode];
  let closedList = [];

  while (openList.length > 0) {
    let currentNode = openList[0];
    let currentIndex = 0;

    // Find node with lowest 'f' cost in openList
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < currentNode.f) {
        currentNode = openList[i];
        currentIndex = i;
      }
    }

    // Remove current node from openList, add to closedList
    openList.splice(currentIndex, 1);
    closedList.push(currentNode);

    // Check if current node is the goal node
    if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
      let path = [];
      let current = currentNode;
      while (current !== null) {
        path.push([current.x, current.y]);
        current = current.parent;
      }
      return path.reverse();
    }

    // Generate child nodes and evaluate them
    let children = generateChildren(currentNode, endNode);
    children.forEach((child) => {
      let inClosedList = closedList.find(
        (node) => node.x === child.x && node.y === child.y
      );
      if (inClosedList) {
        return;
      }

      let inOpenList = openList.find(
        (node) => node.x === child.x && node.y === child.y
      );
      if (!inOpenList || child.g < inOpenList.g) {
        openList.push(child);
      }
    });
  }

  return null; // No path found
}

function generateChildren(currentNode, endNode) {
  const moves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];

  let children = [];

  moves.forEach((move) => {
    let newX = currentNode.x + move[0];
    let newY = currentNode.y + move[1];
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      let child = new Node(newX, newY, currentNode);
      child.g = currentNode.g + 1; // Assuming each step has a cost of 1 (as in chess)
      child.h = heuristic(child, endNode); // Heuristic function
      child.f = child.g + child.h;
      children.push(child);
    }
  });

  return children;
}

function heuristic(node, endNode) {
  // Calculate Manhattan distance as the heuristic
  return Math.abs(endNode.x - node.x) + Math.abs(endNode.y - node.y);
}

// Usage example:
let start = [0, 0];
let end = [5, 5];
let shortestPath = astar(start, end);
console.log(shortestPath);
