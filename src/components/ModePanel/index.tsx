import ModePanelItem from './Item';
import './index.css';

export const ModePanel = () => {
  return (
    <div className="d-flex flex-column" id="editor-panel" style={{ overflow: 'hidden' }}>
      <ModePanelItem mode="grid" icon="grid-3x3-gap" color="dark" />
      <ModePanelItem mode="node" icon="circle-fill" color="secondary" />
      <ModePanelItem mode="edge" icon="arrow-down-right" color="danger" />
      <ModePanelItem mode="delete" icon="x-circle" color="danger" />
      <ModePanelItem mode="edit" icon="arrows-move" color="dark" />
    </div>
  );
};
