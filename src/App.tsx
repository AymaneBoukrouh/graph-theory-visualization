import { useState } from 'react';
import { Grid, ModePanel } from '@/components';
import './App.css';

interface AppProps {}

const App = (props: AppProps) => {
  return (
    <div className="App">
      <div className="position-absolute top-50 start-0 translate-middle-y">
        <ModePanel />
      </div>
      <Grid />
    </div>
  );
}

export default App;
