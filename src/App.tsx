import { useState } from 'react';
import Grid from './components/Grid';
import EditorPanel from './components/EditorPanel';
import Graph from './types/Graph';
import Node from './types/Node';
import Edge from '@/types/Edge';
import './App.css';

interface AppProps {}

const App = (props: AppProps) => {
  const [graph, setGraph] = useState<Graph>({
    nodes: [] as Node[],
    edges: [] as Edge[]
  } as Graph);

  return (
    <div className="App">
      <div className="position-absolute top-50 start-0 translate-middle-y">
        <EditorPanel />
      </div>
      <Grid graph={graph} setGraph={setGraph} />
    </div>
  );
}

export default App;
