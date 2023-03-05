import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Node } from '@/types';
import anime from 'animejs';

interface EdgeProps {
  edge: { source: Node, target: Node }
};

export const Edge = ({ edge }: EdgeProps) => {
  const { cellSize } = useSelector((state: any) => state.grid);

  const source = edge.source;
  const target = edge.target;
  const weight = edge.weight;

  const x1 = source.coords.x * cellSize + cellSize/2;
  const y1 = source.coords.y * cellSize + cellSize/2;
  const x2 = target.coords.x * cellSize + cellSize/2;
  const y2 = target.coords.y * cellSize + cellSize/2;

  const [isVisible, setIsVisible] = useState(true);

  const length = Math.sqrt((y1 - y2) * (y1 - y2) + (x1 - x2) * (x1 - x2));
  const angle = Math.atan2(x2 - x1, y2 - y1) * 180 / Math.PI;

  // get middle point of edge
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  const { animatedEdge } = useSelector((state: any) => state.animation);

  useEffect(() => {
    if (animatedEdge === null)
      return;

    if (animatedEdge.edge.source.label !== source.label || animatedEdge.edge.target.label !== target.label)
      return;

    
    setIsVisible(animatedEdge.color !== 'white');

    // create two svg lines, starting from the center, each going to a corner of the edge
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    //line1.setAttribute('x1', midX);
    //line1.setAttribute('y1', midY);
    // ignore lines above
    // we want the lines to have a gap between them
    const offset = 3;
    const sin = Math.sin(angle * Math.PI / 180);
    const cos = Math.cos(angle * Math.PI / 180);
    
    line1.setAttribute('x1', x2 - (length/2 - offset) * sin);
    line1.setAttribute('y1', y2 - (length/2 - offset) * cos);
    line1.setAttribute('x2', x2);
    line1.setAttribute('y2', y2);
    line1.setAttribute('stroke', animatedEdge.color);
    line1.setAttribute('stroke-width', '1');
    line1.setAttribute('stroke-linecap', 'round');

    line2.setAttribute('x1', x1 + (length/2 - offset) * sin);
    line2.setAttribute('y1', y1 + (length/2 - offset) * cos);
    line2.setAttribute('x2', x1);
    line2.setAttribute('y2', y1);
    line2.setAttribute('stroke', animatedEdge.color);
    line2.setAttribute('stroke-width', '1');
    line2.setAttribute('stroke-linecap', 'round');

    // add them to the svg below by reference
    const svg = document.getElementById('svg-grid');

    const existingCircle = svg.querySelector('circle');
    svg?.insertBefore(line1, existingCircle);
    svg?.insertBefore(line2, existingCircle);

    //svg?.appendChild(line1);
    //svg?.appendChild(line2);

    // animate the lines
    anime({
      targets: [line1, line2],
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2000
    })
  }, [animatedEdge]);

  // text
  const textX = midX + 0 * Math.cos(angle * Math.PI / 180);
  const textY = midY + 0 * Math.sin(angle * Math.PI / 180);  

  return (
    <g>
      <line
        id={`edge-${source.label}-${target.label}`}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="red" strokeWidth=".2"
      />
      <rect
        x={midX - 3} y={midY - 3}
        width="6" height="6"
        fill="white"
      />
      <text
        x={textX} y={textY}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize="4"
        color="red"
      >
        { weight }
      </text>
    </g>
  );
};
