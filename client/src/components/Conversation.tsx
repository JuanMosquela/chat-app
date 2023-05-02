import { useEffect, useState } from "react";
import noProfile from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { selectChat, setChat } from "../redux/slices/chat.slice";

interface ConversationProps {
  chat: any;
  currentUserId: string;
  handleSelected: any;
  selectedChat: any;
}

const Conversation = ({
  chat,
  currentUserId,
  selectedChat,
}: ConversationProps) => {
  const { currentChat } = useSelector(selectChat);
  const dispatch = useDispatch();

  return (
    <div className="border border-y-white/20">
      {chat?.members.map(
        (user: any) =>
          user._id !== currentUserId && (
            <li
              key={user._id}
              onClick={() =>
                dispatch(setChat({ user, currentChatId: chat._id }))
              }
              className={`flex items-center gap-4  p-2 rounded-md bg-[#111B21] text-white hover:bg-[#222E35] ${
                user._id === selectedChat && "bg-[#2A3942] hover:bg-[#2A3942]"
              }`}
            >
              <img
                className="rounded-full w-10"
                src={user?.picture ? user.picture : noProfile}
                alt={user.username}
              />

              <h3>{user.username}</h3>
            </li>
          )
      )}
    </div>
  );
};
export default Conversation;
