import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ChatState {
  currentChat: string;
  currentUserChat: string;
  currentPictureChat: string;
  panelMode: string;
  panelOpen: boolean;
}

function getItem(key: string): string {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

const initialState: ChatState = {
  currentChat: getItem("currentChat"),
  currentUserChat: getItem("currentUserChat"),
  currentPictureChat: getItem("currentPictureChat"),
  panelMode: getItem("panelMode"),
  panelOpen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, { payload }) => {
      console.log(payload);
      const { user, currentChatId } = payload;
      console.log(currentChatId);
      const { username, picture } = user;
      if (currentChatId) {
        state.currentChat = currentChatId;
        state.currentUserChat = username;

        localStorage.setItem("currentChat", JSON.stringify(currentChatId));
        localStorage.setItem("currentUserChat", JSON.stringify(username));
      }

      if (picture) {
        state.currentPictureChat = picture;
        localStorage.setItem("currentPictureChat", JSON.stringify(picture));
      }
    },
    openMenu: (state, { payload }) => {
      state.panelOpen = !state.panelOpen
      state.panelMode = payload;
    },
   

    resetState: (state) => {
      state.currentChat = "";
      state.currentUserChat = "";
      state.currentPictureChat = "";
      localStorage.clear();
    },
  },
});

export const selectChat = (state: RootState) => state.chat;
export const { setChat, resetState, openMenu } = chatSlice.actions;
export default chatSlice.reducer;
