import { connect, useSelector } from 'react-redux';
import { useState } from 'react';
import ModePanelItem from './Item';
import './index.css';

const ModePanel = () => {
  return (
    <div className="d-flex flex-column" id="editor-panel" style={{ overflow: 'hidden' }}>
      <ModePanelItem mode="node" icon="circle-fill" color="secondary" />
      <ModePanelItem mode="edge" icon="arrow-down-right" color="danger" />
      <ModePanelItem mode="delete" icon="x-circle" color="danger" />
      <ModePanelItem mode="edit" icon="arrows-move" color="dark" />
    </div>
  );
};

export default ModePanel;
