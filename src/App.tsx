import Grid from './components/Grid';
import EditorPanel from './components/EditorPanel';
import './App.css';

interface AppProps {}

const App = (props: AppProps) => {
  return (
    <div className="App">
      <div className="position-absolute top-50 start-0 translate-middle-y">
        <EditorPanel />
      </div>
      <Grid />
    </div>
  );
}

export default App;
