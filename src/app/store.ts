import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import secretReducer from '../features/secret/secretSlice';
import errorMessageReducer from '../features/errorMessage/errorMessageSlice';
import successMessageReducer from '../features/successMessage/successMessageSlice';

export const store = configureStore({
  reducer: {
    secret: secretReducer,
    errorMessage: errorMessageReducer,
    successMessage: successMessageReducer
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
