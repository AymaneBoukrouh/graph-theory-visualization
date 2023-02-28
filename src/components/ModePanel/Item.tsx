import { connect, useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './index.css';

interface ModePanelItemProps {
  mode: string;
  icon: string;
  color: string;
};

const ModePanelItem = ({ mode, icon, color }: EditorPanelItemProps) => {
  const editorMode = useSelector((state: any) => state.mode.mode);

  const dispatch = useDispatch();

  const setEditorMode = (mode: string) => {
    dispatch({ type: 'SET_MODE', payload: mode });
  }

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

export default ModePanelItem;
