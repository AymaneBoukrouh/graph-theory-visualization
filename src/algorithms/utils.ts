export const getNodeByLabel = (graph: Graph, label: string) => {
  return graph.nodes.find((node: Node) => node.label === label) || null;
}

export const hasCycle = (graph: Graph) => {
  // check if the graph has a cycle of undirected graph, using DFS (iterative)
  let visited = new Set<Node>();
  let stack = [{ node: graph.nodes[0], parent: null }];

  while (stack.length > 0) {
    const { node, parent } = stack.pop();
    visited.add(node);

    for (const edge of graph.edges) {
      if (edge.source.label === node.label || edge.target.label === node.label) {
        const neighbor = edge.source.label === node.label ? edge.target : edge.source;

        if (neighbor.label === parent?.label) {
          continue; // skip the parent node
        }

        if (visited.has(neighbor)) {
          return true; // cycle detected
        }

        stack.push({ node: neighbor, parent: node });
      }
    }
  }

  return false; // no cycle found
}

export const willHaveCycle = (graph: Graph, edge: Edge) => {
  const newGraph = {
    nodes: [] as Node[],
    edges: [] as Edge[],
  };

  graph.nodes.forEach(node => newGraph.nodes.push({ label: node.label, coords: { x: 0, y: 0 } }));
  graph.edges.forEach(edge => newGraph.edges.push({
    source: getNodeByLabel(newGraph, edge.source.label),
    target: getNodeByLabel(newGraph, edge.target.label),
    weight: edge.weight,
  }));

  const sourceNode = getNodeByLabel(newGraph, edge.source.label);
  const targetNode = getNodeByLabel(newGraph, edge.target.label);

  if (!sourceNode) {
    newGraph.nodes.push({ label: edge.source.label, coords: { x: 0, y: 0 } });
  }

  if (!targetNode) {
    newGraph.nodes.push({ label: edge.target.label, coords: { x: 0, y: 0 } });
  }

  if (sourceNode && targetNode) {
    newGraph.edges.push({
      source: sourceNode,
      target: targetNode,
      weight: edge.weight,
    });
  }

  return hasCycle(newGraph);
}
