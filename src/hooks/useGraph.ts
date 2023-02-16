import Graph from '../types/Graph';
import Node from '../types/Node';
import Edge from '../types/Edge';
import Coords from '../types/Coords';

interface useGraphProps {
  graph: Graph;
  setGraph: (graph: Graph) => void;
}

export const useGraph = ({ graph, setGraph }: useGraphProps) => {
  const getNextNodeLabel = () => {
    if (graph.nodes.length === 0)
      return 'A';

    const lastNode = graph.nodes[graph.nodes.length-1];
    const lastNodeLabel = lastNode.label;
    const nextNodeLabel = String.fromCharCode(lastNodeLabel.charCodeAt(0) + 1);
    return nextNodeLabel;
  };

  const addNode = (coords: Coords) => {
    setGraph({
      nodes: [...graph.nodes, { label: getNextNodeLabel(), coords }],
      edges: [...graph.edges]
    });
  };

  return { addNode };
};
