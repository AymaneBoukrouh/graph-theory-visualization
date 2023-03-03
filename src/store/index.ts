import { configureStore } from '@reduxjs/toolkit';
import { graphReducer, modeReducer, mouseReducer, algorithmReducer, animationReducer } from '@/reducers';

const store = configureStore({
  reducer: {
    mode: modeReducer,
    mouse: mouseReducer,
    graph: graphReducer,
    algorithm: algorithmReducer,
    animation: animationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
