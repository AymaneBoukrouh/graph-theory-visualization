import { useDispatch } from 'react-redux';
import { Graph } from '@/types';
import example1 from './examples/example1';
import example2 from './examples/example2';
import example3 from './examples/example3';
import example4 from './examples/example4';

export const Examples = () => {
  const dispatch = useDispatch();

  const loadExample = (example: number) => {
    switch (example) {
      case 1:
        dispatch({ type: 'SET_GRAPH', payload: example1 });
        break;
      case 2:
        dispatch({ type: 'SET_GRAPH', payload: example2 });
        break;
      case 3:
        dispatch({ type: 'SET_GRAPH', payload: example3 });
        break;
      case 4:
        dispatch({ type: 'SET_GRAPH', payload: example4 });
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
      <div className="d-flex gap-1">
        <div className="btn btn-secondary" onClick={() => loadExample(1)}>1</div>
        <div className="btn btn-secondary" onClick={() => loadExample(2)}>2</div>
      </div>
      <div className="d-flex gap-1">
        <div className="btn btn-secondary" onClick={() => loadExample(3)}>3</div>
        <div className="btn btn-secondary" onClick={() => loadExample(4)}>4</div>
      </div>
      <div className="btn btn-secondary" onClick={resetExample}>Reset</div>
    </div>
  )
}
