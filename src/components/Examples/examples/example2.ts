const nodes = [
  { label: 'A', coords: { x: 20, y: 15 } },
  { label: 'B', coords: { x: 25, y: 20 } },
  { label: 'C', coords: { x: 15, y: 20 } },
];

const edges = [
  { source: nodes[0], target: nodes[1], weight: 1 },
  { source: nodes[1], target: nodes[2], weight: 1 },
  { source: nodes[2], target: nodes[0], weight: 1 },
];

const graph = { nodes, edges };

export default graph;
