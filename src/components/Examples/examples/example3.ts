const nodes = [
  { label: 'A', coords: { x: 17, y: 18 } },
  { label: 'B', coords: { x: 27, y: 18 } },
  { label: 'C', coords: { x: 22, y: 23 } },
  { label: 'D', coords: { x: 22, y: 13 } },
  { label: 'E', coords: { x: 29, y: 23 } },
];

const edges = [
  { source: nodes[0], target: nodes[1], weight: 3 },
  { source: nodes[0], target: nodes[2], weight: 2 },
  { source: nodes[0], target: nodes[3], weight: 8 },
  { source: nodes[1], target: nodes[3], weight: 1 },
  { source: nodes[0], target: nodes[4], weight: 6 },
  { source: nodes[1], target: nodes[4], weight: 3 },
  { source: nodes[2], target: nodes[4], weight: 5 },
];

const graph = { nodes, edges };

export default graph;
