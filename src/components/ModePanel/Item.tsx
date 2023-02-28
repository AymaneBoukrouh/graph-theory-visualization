import { useSelector, useDispatch } from 'react-redux';
import './index.css';

interface ModePanelItemProps {
  mode: string;
  icon: string;
  color: string;
};

const ModePanelItem = ({ mode, icon, color }: EditorPanelItemProps) => {
  // get redux state
  const { editorMode } = useSelector((state: any) => state.mode);

  // get redux dispatch
  const dispatch = useDispatch();

  return (
    <div
      className = 'position-relative p-3'
      style = {{ cursor: 'pointer', backgroundColor: editorMode === mode ? '#eee' : 'transparent' }}
      onClick = {() => (mode: string) => {
        dispatch({ type: 'SET_EDITOR_MODE', payload: mode });

        if (editorMode !== 'edge')
          dispatch({ type: 'SET_IS_EDGE_SELECTED', payload: false });
      }}
    >
      <i className={`bi bi-${icon} text-${color}`} style={{ fontSize: '25px' }}></i>
    </div>
  )
}

export default ModePanelItem;
