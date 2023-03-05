const nodes = [
  { label: 'A', coords: { x: 19, y: 15 } },
  { label: 'B', coords: { x: 25, y: 15 } },
  { label: 'C', coords: { x: 25, y: 19 } },
  { label: 'D', coords: { x: 25, y: 24 } },
  { label: 'E', coords: { x: 19, y: 24 } },
  { label: 'F', coords: { x: 19, y: 19 } },
];

const edges = [
  { source: nodes[0], target: nodes[1], weight: 3 },
  { source: nodes[0], target: nodes[2], weight: 4 },
  { source: nodes[0], target: nodes[5], weight: 7 },
  { source: nodes[1], target: nodes[2], weight: 4 },
  { source: nodes[2], target: nodes[3], weight: 9 },
  { source: nodes[2], target: nodes[4], weight: 9 },
  { source: nodes[2], target: nodes[5], weight: 1 },
  { source: nodes[3], target: nodes[4], weight: 5 }
];

const graph = { nodes, edges };

export default graph;
