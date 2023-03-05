import { configureStore } from '@reduxjs/toolkit';
import * as reducers from '@/reducers';

const store = configureStore({
  reducer: {
    mode: reducers.modeReducer,
    mouse: reducers.mouseReducer,
    graph: reducers.graphReducer,
    algorithm: reducers.algorithmReducer,
    animation: reducers.animationReducer,
    grid: reducers.gridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
