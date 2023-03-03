import StatusPanelItem from './Item';
import './index.css';

export const StatusPanel = () => {
  return (
    <div className="d-flex flex-column" id="status-panel" style={{ overflow: 'hidden' }}>
      <StatusPanelItem text="F-C" />
      <StatusPanelItem text="A-B" />
      <StatusPanelItem text="A-C" />
      <StatusPanelItem text="B-C" />
      <StatusPanelItem text="E-D" />
      <StatusPanelItem text="A-F" />
      <StatusPanelItem text="C-D" />
      <StatusPanelItem text="C-E" />
    </div>
  );
};
