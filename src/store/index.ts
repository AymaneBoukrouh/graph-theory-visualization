import { configureStore } from '@reduxjs/toolkit';
import { graphReducer, modeReducer, mouseReducer } from '@/reducers';

const store = configureStore({
  reducer: {
    mode: modeReducer,
    mouse: mouseReducer,
    graph: graphReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
