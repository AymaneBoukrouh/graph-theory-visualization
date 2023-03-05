import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import anime from 'animejs';

interface NodeProps {
  node: { label: string, coords: { x: number, y: number } };
}

export const Node = ({ node }: NodeProps) => {
  const { cellSize } = useSelector((state: any) => state.grid);
  const { animatedEdge, duration } = useSelector((state: any) => state.animation);

  const circle = useRef(null);

  useEffect(() => {
    if (animatedEdge === null)
      return;

    if (animatedEdge.edge.source.label !== node.label && animatedEdge.edge.target.label !== node.label)
      return;

    anime({
      targets: circle.current,
      r: cellSize/2 - .5 + 1,
      fill: animatedEdge.color === 'white' ? '#f00' : '#008000',
      stroke: animatedEdge.color === 'white' ? '#f00' : '#008000',
      duration: duration / 2,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: 2
    });
  }, [animatedEdge]);

  return (
    <>
        <circle ref={circle}
          cx={node.coords.x * cellSize + cellSize/2}
          cy={node.coords.y * cellSize + cellSize/2}
          r={cellSize/2 - .5}
          fill="#A9A9A9" stroke="#A9A9A9" strokeWidth="1"
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
