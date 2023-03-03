import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';

interface StatusPanelItemProps {
  text: string,
};

const StatusPanelItem = ({ text }: StatusPanelItemProps) => {
  // get redux state
  const { animatedEdge } = useSelector((state: any) => state.animation);
  const [active, setActive] = useState(false);
  const [icon, setIcon] = useState('circle');

  // get redux dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (animatedEdge === null)
      return;

    if (animatedEdge.edge.source.label + '-' + animatedEdge.edge.target.label !== text
      && animatedEdge.edge.target.label + '-' + animatedEdge.edge.source.label !== text)
      return;

    if (animatedEdge.color === 'green')
      setIcon('check');
    else
      setIcon('x');

    setActive(true);
  }, [animatedEdge]);

  return (
    <div
      className = 'position-relative px-3'
      style = {{ cursor: 'pointer', backgroundColor: active ? '#eee' : 'transparent' }}
      onClick = {() => {
        //dispatch({ type: 'SET_EDITOR_MODE', payload: mode });

        //if (editorMode !== 'edge')
        //  dispatch({ type: 'SET_IS_EDGE_SELECTED', payload: false });
      }}
    >
      <div className="d-flex align-items-center gap-2">
      <span>{text}</span><i className={`bi bi-${icon} ${icon === 'check' ? 'text-success' : 'text-danger'}`} style={{ fontSize: '40px' }}></i>
      </div>
    </div>
  )
}

export default StatusPanelItem;
