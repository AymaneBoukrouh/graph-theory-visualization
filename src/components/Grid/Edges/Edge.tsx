import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Node } from '@/types';
import anime from 'animejs';

interface EdgeProps {
  edge: { source: Node, target: Node }
};

export const Edge = ({ edge }: EdgeProps) => {
  const { cellSize } = useSelector((state: any) => state.grid);
  const { duration } = useSelector((state: any) => state.animation);

  const source = edge.source;
  const target = edge.target;
  const weight = edge.weight;

  const x1 = source.coords.x * cellSize + cellSize/2;
  const y1 = source.coords.y * cellSize + cellSize/2;
  const x2 = target.coords.x * cellSize + cellSize/2;
  const y2 = target.coords.y * cellSize + cellSize/2;

  const [isAnimated, setIsAnimated] = useState(false);
  const [animationColor, setAnimationColor] = useState(''); // TODO: don't rely on color

  const length = Math.sqrt((y1 - y2) * (y1 - y2) + (x1 - x2) * (x1 - x2));
  const angle = Math.atan2(x2 - x1, y2 - y1) * 180 / Math.PI;

  // get middle point of edge
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  const offset = 3;
  const sin = Math.sin(angle * Math.PI / 180);
  const cos = Math.cos(angle * Math.PI / 180);

  const line1 = useRef(null);
  const line2 = useRef(null);
  const text = useRef(null);
  

  const { animatedEdge } = useSelector((state: any) => state.animation);

  useEffect(() => {
    if (animatedEdge === null)
      return;

    if (animatedEdge.edge.source.label !== source.label || animatedEdge.edge.target.label !== target.label)
      return;

    
    setIsAnimated(true);
    setAnimationColor(animatedEdge.color);

    // animate the lines
  }, [animatedEdge]);

  useEffect(() => {
    if (isAnimated) {
      anime({
        targets: [line1.current, line2.current],
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: duration
      })

      anime({
        targets: text.current,
        opacity: [1, 0],
        easing: 'easeInOutSine',
        duration: duration
      })
    }
  }, [isAnimated]);

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
      <text ref={text}
        x={textX} y={textY}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize="4"
        color="red"
      >
        { weight }
      </text>
      <line ref={line1}
          //x1={ x2 - (length/2 - offset) * sin } y1={ y2 - (length/2 - offset) * cos }
          //x2={ x2 } y2={ y2 }
          x1 = { x2 } y1 = { y2 }
          x2 = { midX } y2 = { midY }
          stroke={ animationColor } strokeWidth="1"
          strokeWidth="1"
          strokeLinecap="round"
          display={ isAnimated ? 'block' : 'none' }
        />
        <line ref={line2}
          //x1={ x1 + (length/2 - offset) * sin } y1={ y1 + (length/2 - offset) * cos }
          //x2={ x1 } y2={ y1 }
          x1 = { x1 } y1 = { y1 }
          x2 = { midX } y2 = { midY }
          stroke={ animationColor } strokeWidth="1"
          strokeWidth="1"
          strokeLinecap="round"
          display={ isAnimated ? 'block' : 'none' }
        />
    </g>
  );
};
