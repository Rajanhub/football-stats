import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import matchReducer from "app/containers/club/slice";
export const store = configureStore({
  reducer: {
    match: matchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
