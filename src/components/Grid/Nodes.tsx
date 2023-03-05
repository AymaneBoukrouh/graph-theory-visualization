import { useSelector } from 'react-redux';

interface NodeProps {
  node: { label: string, coords: { x: number, y: number } };
}

const Node = ({ node }: NodeProps) => {
  const { cellSize } = useSelector((state: any) => state.grid);

  return (
    <>
        <circle
          cx={node.coords.x * cellSize + cellSize/2}
          cy={node.coords.y * cellSize + cellSize/2}
          r={cellSize/2 - .5}
          fill="darkgray" stroke="darkgray" strokeWidth="1"
          key={`node-${node.label}`}
        />
        <text
          x={node.coords.x * cellSize + cellSize/2}
          y={node.coords.y * cellSize + cellSize/2}
          textAnchor="middle" alignmentBaseline="central"
          fill="white" fontSize="4"
          key={`node-label-${node.label}`}
        >
          {node.label}
        </text>
    </>
  );
};

export const Nodes = () => {
  const { graph } = useSelector((state: any) => state.graph);
  
  return (
    <>
    {graph.nodes.map((node: any) =>
            <Node node={node} key={`node-${node.label}`} />
    )}
    </>
  )
}
