import { connect } from 'react-redux';
import { useState } from 'react';
import './EditorPanel.css';

interface EditorPanelProps {
  setEditorMode: (mode: string) => void;
}

const EditorPanel = (props: EditorPanelProps) => {
  const { setEditorMode } = props;

  return (
    <div className="d-flex flex-column p-3" id="editor-panel">
      <div className="position-relative" style={{ height: '35px', cursor: 'pointer' }} onClick={() => setEditorMode('node')}><div className="cell-node"></div></div>
      <div className="d-flex justify-content-center" style={{ height: '35px', cursor: 'pointer' }} onClick={() => setEditorMode('edge')}>
        <div className="mt-1 ms-1" style={{
          width: '35px',
          height: '3px',
          transform: `rotate(45deg)`,
          transformOrigin: '0 0',
          backgroundColor: 'red',
        }}></div>
      </div>
      <div style={{ cursor: 'pointer' }} onClick={() => setEditorMode('delete')}>
        <i className="bi bi-trash text-danger" style={{ fontSize: '25px' }}></i>
      </div>
      <div style={{ cursor: 'pointer' }} onClick={() => setEditorMode('edit')}>
        <i className="bi bi-pencil text-primary" style={{ fontSize: '25px' }}></i>
      </div>
      {/** TODO: add clear button */}
    </div>
  );
};

const mapDispatchToProps = {
  setEditorMode: (mode: string) => ({
    type: 'SET_MODE',
    payload: mode
  })
};

export default connect(null, mapDispatchToProps)(EditorPanel);
