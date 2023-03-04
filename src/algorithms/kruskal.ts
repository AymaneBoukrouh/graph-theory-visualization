import { willHaveCycle, getNodeByLabel } from '@/algorithms/utils';

export const kruskal = (graph: Graph) => {
  var edgesToAnimate = [] as { edge: Edge, color: string }[];
  var kruskalGraph = {
    nodes: [] as Node[],
    edges: [] as Edge[],
  } as Graph;

  // deep copy the edges and sort them by weight
  var sortedEdges = JSON.parse(JSON.stringify(graph.edges)).sort((a: Edge, b: Edge) => a.weight - b.weight);

  for (const edge of sortedEdges) {
    if (!willHaveCycle(kruskalGraph, edge)) {
      if (!getNodeByLabel(kruskalGraph, edge.source.label)) {
        kruskalGraph.nodes.push({ label: edge.source.label, coords: { x: 0, y: 0 } });
      }

      if (!getNodeByLabel(kruskalGraph, edge.target.label)) {
        kruskalGraph.nodes.push({ label: edge.target.label, coords: { x: 0, y: 0 } });
      }

      kruskalGraph.edges.push({
        source: getNodeByLabel(kruskalGraph, edge.source.label),
        target: getNodeByLabel(kruskalGraph, edge.target.label),
        weight: edge.weight,
      });

      edgesToAnimate.push({ edge, color: 'green' });
    } else {
      edgesToAnimate.push({ edge, color: 'white' });
    }
  }

  return { edgesToAnimate };
}