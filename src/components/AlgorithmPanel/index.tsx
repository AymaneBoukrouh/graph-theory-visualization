import AlgorithmPanelItem from './Item';
import { useSelector } from 'react-redux';
import { Graph, Node, Edge } from '@/types';
import './index.css';

export const AlgorithmPanel = () => {
  // TODO: check directed/undirected graph, as well as other conditions for each algorithm
  // TODO: optimize the algorithm, it was just a quick implementation for testing purposes

  const { algorithm } = useSelector((state: any) => state.algorithm);
  const { graph } = useSelector((state: any) => state.graph);

  const hasCycle = (graph: Graph) => {
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
  

  const getNodeByLabel = (graph: Graph, label: string) => {
    return graph.nodes.find((node: Node) => node.label === label) || null;
  }
  
  const willHaveCycle = (graph: Graph, edge: Edge) => {
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
  

  const visualize = () => {
    if (algorithm === 'kruskal' || true) {
      var kruskalGraph = {
        nodes: [] as Node[],
        edges: [] as Edge[],
      } as Graph;

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
        }
      }   
    }
  }

  return (
    <div>
      <div className="d-flex mb-2" id="algorithm-panel" style={{ overflow: 'hidden' }}>
        <AlgorithmPanelItem algorithm="bellman-ford" />
        <AlgorithmPanelItem algorithm="dijkstra" />
        <AlgorithmPanelItem algorithm="floyd-warshall" />
        <AlgorithmPanelItem algorithm="kruskal" />
        <AlgorithmPanelItem algorithm="prim" />
      </div>
      <div>
        <button onClick={() => visualize() } className="btn btn-secondary">Visualize</button>
      </div>
    </div>
  );
};
