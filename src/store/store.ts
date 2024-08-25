import { configureStore } from '@reduxjs/toolkit';
import operatorReducer from './slices/operatorSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    operators: operatorReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;
