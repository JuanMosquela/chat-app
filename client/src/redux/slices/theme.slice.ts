import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ThemeState {
  theme: string;
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  background: string;
  messageMe: string;
  messageAll: string;
}

function getItem(key: string): string {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : "";
}

const initialState: ThemeState = {
  theme: "dark",
  backgroundColor: "bg-dark",
  textColor: "text-white",
  headingColor: "bg-dark_heading",
  background: "bg-dark",
  messageMe: "bg-dark_color_msg_me",
  messageAll: "bg-dark_color_msg_all",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, { payload }) => {
      const {
        theme,
        backgroundColor,
        textColor,
        headingColor,
        background,
        messageMe,
        messageAll,
      } = payload;
      state.theme = theme;
      state.backgroundColor = backgroundColor;
      state.textColor = textColor;
      state.headingColor = headingColor;
      state.background = background;
      state.messageMe = messageMe;
      state.messageAll = messageAll;
    },
  },
});

export const selectTheme = (state: RootState) => state.theme;
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
