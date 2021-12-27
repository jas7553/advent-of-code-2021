#! /usr/local/bin/node

const fs = require('fs');

const getLines = () => fs.readFileSync('./input-12-sample.txt', 'utf8').trim().split('\n');

const bfs = (graph, current = 'start', visited = new Set()) => {
  if (current === 'end') {
    return [[current]];
  }

  const paths = [];
  const toVisit = [...graph[current]];
  while (toVisit.length !== 0) {
    const neighbor = toVisit.shift();
    if (neighbor.match(/[a-z]/) && neighbor !== 'end') {
      if (visited.has(neighbor)) {
        continue;
      }
      visited.add(neighbor);
    }
    // if (neighbor !== 'end') {
    //   toVisit.push(...graph[neighbor]);
    // }
    const bfsResult = bfs(graph, neighbor, visited);
    for (const path of bfsResult) {
      paths.push([current, ...path]);
    }
  }

  return paths;
}

const partOne = () => {
  const lines = getLines();
  const graph = {};
  for (const line of lines) {
    const [ edgeStart, edgeEnd ] = line.split('-');
    if (graph[edgeStart]) {
      if (edgeEnd !== 'start') {
        graph[edgeStart].push(edgeEnd);
      }
      if (graph[edgeEnd]) {
        graph[edgeEnd].push(edgeStart);
      } else if (edgeEnd !== 'end' && edgeStart !== 'start') {
        graph[edgeEnd] = [edgeStart];
      }
    } else {
      graph[edgeStart] = [edgeEnd];
      if (edgeStart !== 'start') {
        graph[edgeEnd] = [edgeStart];
      }
    }
  };

  for (const x in graph) {
    graph[x].sort();
  }
  console.log(graph);
  const paths = bfs(graph);
  console.log('paths:', paths);
};

partOne();