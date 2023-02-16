import { connect, useSelector } from 'react-redux';
import { useState } from 'react';
import './index.css';

interface ModePanelItemProps {
  setEditorMode: (mode: string) => void;
  mode: string;
  icon: string;
  color: string;
};

const ModePanelItem = ({ setEditorMode, mode, icon, color }: EditorPanelItemProps) => {
  const editorMode = useSelector((state: any) => state.mode.mode);

  return (
    <div
      className = 'position-relative p-3'
      style = {{ cursor: 'pointer', backgroundColor: editorMode === mode ? '#eee' : 'transparent' }}
      onClick = {() => setEditorMode(mode)}
    >
      <i className={`bi bi-${icon} text-${color}`} style={{ fontSize: '25px' }}></i>
    </div>
  )
}

const mapDispatchToProps = {
  setEditorMode: (mode: string) => ({
    type: 'SET_MODE',
    payload: mode
  })
};

export default connect(null, mapDispatchToProps)(ModePanelItem);
