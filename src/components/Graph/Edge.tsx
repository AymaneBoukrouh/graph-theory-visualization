import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Node } from '@/types';
import anime from 'animejs';

interface EdgeProps {
  source: Node,
  target: Node,
  weight: number,
};

export const Edge = ({ source, target, weight }: EdgeProps) => {
  const x1 = source.coords.x;
  const y1 = source.coords.y;
  const x2 = target.coords.x;
  const y2 = target.coords.y;

  const length = Math.sqrt((y1 - y2) * (y1 - y2) + (x1 - x2) * (x1 - x2));
  const angle = Math.atan2(x2 - x1, y2 - y1) * 180 / Math.PI;

  const { animatedEdge } = useSelector((state: any) => state.animation);

  useEffect(() => {
    if (animatedEdge === null)
      return;

    if (animatedEdge.edge.source.label !== source.label || animatedEdge.edge.target.label !== target.label)
      return;

    // create two svg lines, starting from the center, each going to a corner of the edge
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    line1.setAttribute('x1', length/2);
    line1.setAttribute('y1', '0');
    line1.setAttribute('x2', '0');
    line1.setAttribute('y2', '0');
    line1.setAttribute('stroke', animatedEdge.color);
    line1.setAttribute('stroke-width', '3');

    line2.setAttribute('x1', length/2);
    line2.setAttribute('y1', '0');
    line2.setAttribute('x2', length);
    line2.setAttribute('y2', '0');
    line2.setAttribute('stroke', animatedEdge.color);
    line2.setAttribute('stroke-width', '3');

    // add them to the svg below by reference
    const svg = document.getElementById(`edge-${source.label}-${target.label}`);
    svg?.appendChild(line1);
    svg?.appendChild(line2);

    // animate the lines
    anime({
      targets: [line1, line2],
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2000
    })
  }, [animatedEdge]);

  return (
    <svg
      id={`edge-${source.label}-${target.label}`}
      viewBox={`0 0 ${length} 1`}
      style={{
        position: 'absolute',
        top: `${x1 + 17.5}px`,
        left: `${y1 + 17.5}px`,
        width: `${length}px`,
        height: '3px',
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
        overflow: 'visible',
      }}
    >
      <line
        x1="0"
        y1="0"
        x2={length}
        y2="0"
        stroke="red"
        strokeWidth="1"
      />
      <text // TODO: rotate text in the negative direction
        x={ length / 2 }
        y={ 15 }
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="black"
        fontSize="20px"
      >
        {weight}
      </text>
    </svg>
  );
};
