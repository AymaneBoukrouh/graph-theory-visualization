import AlgorithmPanelItem from './Item';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Graph, Node, Edge } from '@/types';
import { willHaveCycle, getNodeByLabel } from '@/algorithms/utils';
import { kruskal } from '@/algorithms';
import { useAnimation } from '@/hooks/useAnimation';
import './index.css';

export const AlgorithmPanel = () => {
  // TODO: check directed/undirected graph, as well as other conditions for each algorithm
  // TODO: optimize the algorithm, it was just a quick implementation for testing purposes

  const { algorithm } = useSelector((state: any) => state.algorithm);
  const { graph } = useSelector((state: any) => state.graph);

  const dispatch = useDispatch();  

  const { animateEdges } = useAnimation();

  const visualize = () => {
    if (algorithm === 'kruskal') {
      const { edgesToAnimate } = kruskal(graph);
      animateEdges(edgesToAnimate);
    }
  }

  const algorithms = ['bellman-ford', 'dijkstra', 'floyd-warshall', 'kruskal', 'prim'];

  useEffect(() => {
    if (algorithm === 'kruskal') {
      var sortedEdges = JSON.parse(JSON.stringify(graph.edges)).sort((a: Edge, b: Edge) => a.weight - b.weight);

      dispatch({
        type: 'SET_STATUS_EDGES',
        payload: sortedEdges
      });
    }
  }, [algorithm, graph.edges]);

  return (
    <div>
      <div className="d-flex mb-2" id="algorithm-panel" style={{ overflow: 'hidden' }}>
        {algorithms.map((algorithm, index) => (
          <AlgorithmPanelItem
            key={index}
            algorithm={algorithm}
          />
        ))}
      </div>
      <div>
        <button onClick={() => visualize() } className="btn btn-secondary">Visualize</button>
      </div>
    </div>
  );
};
