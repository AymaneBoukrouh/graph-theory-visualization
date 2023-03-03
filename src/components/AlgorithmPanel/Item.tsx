import { useSelector, useDispatch } from 'react-redux';
import './index.css';

interface AlgorithmyyPanelItemProps {
  algorithm: string;
};

function upperAlgorithmName (algorithm: string) {
  return algorithm.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('-');
}

const AlgorithmPanelItem = ({ algorithm }: AlgorithmPanelItemProps) => {
  // get redux state
  const currentAlgorithm = useSelector((state: any) => state.algorithm.algorithm);

  // get redux dispatch
  const dispatch = useDispatch();

  return (
    <div
      className = 'algorithm-panel-item position-relative p-3'
      style = {{ cursor: 'pointer', backgroundColor: currentAlgorithm === algorithm ? '#eee' : 'transparent' }}
      onClick = {() => {
        dispatch({ type: 'SET_ALGORITHM', payload: algorithm });
      }}
    >
      { upperAlgorithmName(algorithm) }
    </div>
  )
}

export default AlgorithmPanelItem;
