const nodes = [
  { label: 'A', coords: { x: 10, y: 20 } },
  { label: 'B', coords: { x: 30, y: 20 } },
  { label: 'C', coords: { x: 20, y: 30 } },
  { label: 'D', coords: { x: 40, y: 30 } },
  { label: 'E', coords: { x: 10, y: 40 } },
  { label: 'F', coords: { x: 30, y: 40 } },
  { label: 'G', coords: { x: 20, y: 50 } },
  { label: 'H', coords: { x: 40, y: 50 } }
];

const edges = [
  { source: nodes[0], target: nodes[1], weight: 5 },
  { source: nodes[0], target: nodes[2], weight: 7 },
  { source: nodes[0], target: nodes[3], weight: 3 },
  { source: nodes[1], target: nodes[3], weight: 2 },
  { source: nodes[1], target: nodes[4], weight: 6 },
  { source: nodes[2], target: nodes[4], weight: 8 },
  { source: nodes[2], target: nodes[5], weight: 4 },
  { source: nodes[3], target: nodes[6], weight: 1 },
  { source: nodes[3], target: nodes[7], weight: 9 },
  { source: nodes[4], target: nodes[6], weight: 2 },
  { source: nodes[4], target: nodes[7], weight: 4 },
  { source: nodes[5], target: nodes[6], weight: 5 },
  { source: nodes[5], target: nodes[7], weight: 7 },
  { source: nodes[6], target: nodes[7], weight: 3 }
];

const graph = { nodes, edges };

export default graph;
