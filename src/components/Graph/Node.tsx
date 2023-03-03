import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Coords from '@/types/Coords';

interface NodeProps {
  coords: Coords;
  label: string;
};

export const Node = ({ coords, label }: NodeProps) => {
  const { animatedEdge } = useSelector((state: any) => state.animation);
  const [isVisited, setIsVisited] = useState(false);

  useEffect(() => {
    if (animatedEdge === null)
      return;

    if (animatedEdge.edge.source.label !== label && animatedEdge.edge.target.label !== label)
      return;
    
    setTimeout(() => {
      //setIsVisited(true);
    }, 1600);
  }, [animatedEdge]);

  return (
    <div
      id={`node-${label}`}
      className="cell-node d-flex align-items-center justify-content-center text-white"
      style={{
        left: `${coords.y}px`,
        top: `${coords.x}px`,
        width: '35px',
        height: '35px',
        pointerEvents: 'none',
        zIndex: 100,
        backgroundColor: isVisited ? 'green' : ''
      }}>
      {label}
    </div>
  )
}
