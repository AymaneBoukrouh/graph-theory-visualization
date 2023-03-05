import { useSelector } from 'react-redux';
import { Edge } from './Edge';

const Edges = () => {
  const { graph } = useSelector((state: any) => state.graph);

  return (
    <>
      {graph.edges.map((edge: any) =>
            <Edge edge={edge} key={`edge-${edge.source.label}-${edge.target.label}`} />
    )}
    </>
  )
}

export { Edges, Edge };
