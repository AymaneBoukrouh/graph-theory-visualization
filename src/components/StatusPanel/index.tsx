import { useSelector } from 'react-redux';
import StatusPanelItem from './Item';
import './index.css';

export const StatusPanel = () => {
  const { statusEdges } =  useSelector((state: any) => state.animation);

  return (
    <div className="d-flex flex-column" id="status-panel" style={{ overflow: 'hidden' }}>
      {statusEdges.map((edge: any) =>
        <StatusPanelItem
          key={`status-edge-${edge.source.label}-${edge.target.label}`}
          text={`${edge.source.label}-${edge.target.label}`}
        />
      )}
    </div>
  );
};
