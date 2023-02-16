import Coords from '@/types/Coords';

interface NodeProps {
  coords: Coords;
  label: string;
};

const Node = ({ coords, label }: NodeProps) => {
  return (
    <div
      className="cell-node d-flex align-items-center justify-content-center text-white"
      style={{
        left: `${coords.y}px`,
        top: `${coords.x}px`,
        width: '35px',
        height: '35px',
        pointerEvents: 'none'
      }}>
      {label}
    </div>
  )
}

export default Node;
