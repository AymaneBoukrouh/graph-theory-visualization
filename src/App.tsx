import { useState } from 'react';
import { Grid, ModePanel, AlgorithmPanel, StatusPanel } from '@/components';
import './App.css';

interface AppProps {}

const App = (props: AppProps) => {
  return (
    <div className="App">
      <div className="position-absolute top-50 start-0 translate-middle-y">
        <ModePanel />
      </div>
      <div className="position-absolute top-0 start-50 translate-middle-x">
        <AlgorithmPanel />
      </div>
      <div className="position-absolute top-50 end-0 translate-middle-y">
        <StatusPanel />
      </div>
      <Grid />
    </div>
  );
}

export default App;
