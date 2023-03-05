const nodes = [
  { label: 'A', coords: { x: 10, y: 10 } },
  { label: 'B', coords: { x: 15, y: 10 } },
  { label: 'C', coords: { x: 20, y: 10 } },
  { label: 'D', coords: { x: 15, y: 15 } },
  { label: 'E', coords: { x: 15, y: 5 } },
  { label: 'F', coords: { x: 25, y: 10 } },
];

const edges = [
  { source: nodes[0], target: nodes[1], weight: 3 },
  { source: nodes[0], target: nodes[2], weight: 2 },
  { source: nodes[0], target: nodes[3], weight: 8 },
  { source: nodes[0], target: nodes[4], weight: 5 },
  { source: nodes[0], target: nodes[5], weight: 5 },
];

const graph = { nodes, edges };

export default graph;
