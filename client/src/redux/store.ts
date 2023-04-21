import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import emptyApi from "./api/emptyApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(emptyApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
