import { configureStore } from '@reduxjs/toolkit';
import trialReducer from './Components/slices/chatSlice';

const store = configureStore({
  reducer: {
    trialUser: trialReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store