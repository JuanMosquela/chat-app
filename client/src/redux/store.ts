import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import emptyApi from "./api/emptyApi";
import chatReducer from "./slices/chat.slice";
import themeReducer from "./slices/theme.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    theme: themeReducer,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(emptyApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
