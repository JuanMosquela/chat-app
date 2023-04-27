import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  id: string;
  username: string;
  picture?: string;
  email: string;
  token: string;
}

function getItem(key: string): string {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : "";
}

const initialState: UserState = {
  id: getItem("id"),
  username: getItem("user"),
  picture: getItem("picture"),
  email: getItem("email"),
  token: getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.id = user._id;
      state.username = user.username;

      state.email = user.email;
      state.token = token;

      localStorage.setItem("id", JSON.stringify(state.id));
      localStorage.setItem("user", JSON.stringify(state.username));
      localStorage.setItem("email", JSON.stringify(state.email));
      localStorage.setItem("picture", JSON.stringify(state.picture));
      localStorage.setItem("token", JSON.stringify(state.token));

      if (user.picture) {
        state.picture = user.picture;

        localStorage.setItem("picture", JSON.stringify(state.picture));
      }
    },

    logout: (state) => {
      state.username = "";
      state.picture = "";
      state.email = "";
      state.token = "";
      localStorage.clear();
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
