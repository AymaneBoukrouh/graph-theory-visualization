const nodes = [
  { label: 'A', coords: { x: 15, y: 5 } },
  { label: 'B', coords: { x: 5, y: 15 } },
  { label: 'C', coords: { x: 8, y: 20 } },
  { label: 'D', coords: { x: 15, y: 25 } },
  { label: 'E', coords: { x: 22, y: 20 } },
  { label: 'F', coords: { x: 25, y: 15 } },
  { label: 'G', coords: { x: 15, y: 10 } },
  { label: 'H', coords: { x: 10, y: 5 } },
  { label: 'I', coords: { x: 5, y: 10 } },
  { label: 'J', coords: { x: 18, y: 7 } },
];

const edges = [
  { source: nodes[0], target: nodes[1], weight: 7 },
  { source: nodes[1], target: nodes[2], weight: 2 },
  { source: nodes[2], target: nodes[3], weight: 9 },
  { source: nodes[3], target: nodes[4], weight: 5 },
  { source: nodes[4], target: nodes[5], weight: 4 },
  { source: nodes[5], target: nodes[6], weight: 6 },
  { source: nodes[6], target: nodes[7], weight: 8 },
  { source: nodes[7], target: nodes[8], weight: 3 },
  { source: nodes[8], target: nodes[9], weight: 1 },
  { source: nodes[9], target: nodes[0], weight: 4 },
];

const graph = { nodes, edges };

export default graph;
