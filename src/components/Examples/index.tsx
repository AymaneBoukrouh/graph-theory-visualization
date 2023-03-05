import { useDispatch } from 'react-redux';
import { Graph } from '@/types';
import example1 from './examples/example1';

export const Examples = () => {
  const dispatch = useDispatch();

  const loadExample = (example: number) => {
    switch (example) {
      case 1:
        dispatch({ type: 'SET_GRAPH', payload: example1 });
        break;
      default:
        break;
    }
  }

  const resetExample = () => {
    dispatch({ type: 'SET_GRAPH', payload: {
      nodes: [],
      edges: [],
    } as Graph });
  }

  return (
    <div className="d-flex flex-column gap-1 p-3">
      <div className="btn btn-secondary" onClick={() => loadExample(1)}>1</div>
      <div className="btn btn-secondary" onClick={resetExample}>Reset</div>
    </div>
  )
}
