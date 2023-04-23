import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  username: any;
  picture: string;
  email: string;
  token: string;
}

const initialState: AuthState = {
  username: localStorage.getItem("username")
    ? JSON.parse(localStorage.getItem("username") || "")
    : "",
  picture: localStorage.getItem("picture")
    ? JSON.parse(localStorage.getItem("picture") || "")
    : "",
  email: localStorage.getItem("email")
    ? JSON.parse(localStorage.getItem("email") || "")
    : "",
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") || "")
    : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.username = user.username;
      state.picture = user.picture;
      state.email = user.email;
      state.token = token;

      localStorage.setItem("user", JSON.stringify(state.username));
      localStorage.setItem("email", JSON.stringify(state.email));
      localStorage.setItem("picture", JSON.stringify(state.picture));
      localStorage.setItem("token", JSON.stringify(state.token));
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
