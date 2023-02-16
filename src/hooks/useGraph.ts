import Graph from '../types/Graph';
import Node from '../types/Node';
import Edge from '../types/Edge';
import Coords from '../types/Coords';

interface useGraphProps {
  graph: Graph;
  setGraph: (graph: Graph) => void;
}

export const useGraph = ({ graph, setGraph }: useGraphProps) => {
  /*
    This hook is responsible for basic graph manipulation.
    When a node is added:
      - A label is automatically assigned to the node
    When a node is removed:
      - All edges connected to the node are removed
      - All labels of nodes after the removed node are decremented
  */

  // Helper functions
  const getNextNodeLabel = () => {
    if (graph.nodes.length === 0)
      return 'A';

    const lastNode = graph.nodes[graph.nodes.length-1];
    const lastNodeLabel = lastNode.label;
    const nextNodeLabel = String.fromCharCode(lastNodeLabel.charCodeAt(0) + 1);
    return nextNodeLabel;
  };

  // Node manipulation
  const getNode = (coords: Coords): Node | null => {
    return graph.nodes.find(node => node.coords.x === coords.x && node.coords.y === coords.y) || null;
  }

  const addNode = (coords: Coords) => {
    setGraph({
      nodes: [...graph.nodes, { label: getNextNodeLabel(), coords }],
      edges: [...graph.edges]
    });
  };

  const removeNode = (coords: Coords) => {
    const nodeToRemove = graph.nodes.find(node => node.coords.x === coords.x && node.coords.y === coords.y);
    if (!nodeToRemove)
      return;
    
    const nodeToRemoveIndex = graph.nodes.indexOf(nodeToRemove);

    setGraph({
      nodes: [
        ...graph.nodes.slice(0, nodeToRemoveIndex),
        ...graph.nodes.slice(nodeToRemoveIndex+1).map(node => {
          return {
            label: String.fromCharCode(node.label.charCodeAt(0) - 1),
            coords: node.coords
          }
        })
      ],
      edges: graph.edges.filter(edge => {
        return (edge.source !== nodeToRemove) && (edge.target !== nodeToRemove);
      })
    });
  }

  return { getNode, addNode, removeNode };
};
