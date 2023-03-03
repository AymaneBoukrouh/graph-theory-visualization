import AlgorithmPanelItem from './Item';
import './index.css';

export const AlgorithmPanel = () => {
  return (
    <div>
      <div className="d-flex mb-2" id="algorithm-panel" style={{ overflow: 'hidden' }}>
        <AlgorithmPanelItem algorithm="bellman-ford" />
        <AlgorithmPanelItem algorithm="dijkstra" />
        <AlgorithmPanelItem algorithm="floyd-warshall" />
        <AlgorithmPanelItem algorithm="kruskal" />
        <AlgorithmPanelItem algorithm="prim" />
      </div>
    </div>
  );
};
