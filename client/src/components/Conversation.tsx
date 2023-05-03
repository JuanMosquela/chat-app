import { useEffect, useState } from "react";
import noProfile from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { selectChat, setChat } from "../redux/slices/chat.slice";
import { selectAuth } from "../redux/slices/auth.slice";
import UserCard from "./UserCard";

interface ConversationProps {
  chat: any;
  selectedChat: any;
}

const Conversation = ({ chat, selectedChat }: ConversationProps) => {
  const { currentChat } = useSelector(selectChat);
  const { id } = useSelector(selectAuth);
  const dispatch = useDispatch();

  console.log(chat);

  return (
    <div className=" cursor-pointer ">
      {chat?.members.map(
        (user: any) =>
          user._id !== id && (
            <>
              <UserCard
                key={chat._id}
                user={user}
                chat={chat}
                selectedChat={selectedChat}
              />
            </>
          )
      )}
    </div>
  );
};
export default Conversation;
