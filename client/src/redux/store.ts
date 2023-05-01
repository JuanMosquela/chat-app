import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import emptyApi from "./api/emptyApi";
import chatReducer from "./slices/chat.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(emptyApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
