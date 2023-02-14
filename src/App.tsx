import { useState } from 'react';
import Grid from './components/Grid';
import EditorPanel from './components/EditorPanel';
import './App.css';

const App = () => {
  const [editorMode, setEditorMode] = useState<string>('node');

  return (
    <div className="App">
      <div className="position-absolute top-50 start-0 translate-middle-y">
        <EditorPanel setEditorMode={setEditorMode} />
      </div>
      <Grid editorMode={editorMode} />
    </div>
  );
}

export default App;
