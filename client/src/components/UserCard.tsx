import { useEffect, useRef } from "react";
import User from "../types/user";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";
import noProfile from "../assets/user.png";
import { selectChat, setChat } from "../redux/slices/chat.slice";
import { useCreateConversationMutation } from "../redux/api/conversationApi";

interface UserProps {
  user: User;
  chat?: any;
  selectedChat: any;
}

const UserCard = ({ user, chat, selectedChat }: UserProps) => {
  const { id } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const [createConversation, { data }] = useCreateConversationMutation();

  const handleFunction = (userId: string) => {
    if (chat?._id) {
      console.log("voy al chat");
      dispatch(setChat({ user, currentChatId: chat._id }));
    } else {
      console.log("creo el chat");
      const body = {
        from: id,
        to: userId,
      };
      createConversation(body);
    }
  };

  console.log(data);

  return (
    <li
      key={user._id}
      onClick={() => handleFunction(user._id)}
      className={`flex items-center px-4 gap-4 cursor-pointer    rounded-md bg-dark text-white hover:bg-[#222E35] ${
        user._id === selectedChat && "bg-[#2A3942] hover:bg-[#2A3942]"
      }`}
    >
      <img
        className="rounded-full w-[45px]"
        src={user?.picture ? user.picture : noProfile}
        alt={user.username}
      />
      <div className=" h-[70px] w-full flex flex-col justify-between">
        <div>
          <h3 className=" pt-3">{user.username}</h3>
          <p className="text-white/60">{user.email}</p>
        </div>

        <hr className="w-full text-soft_dark" />
      </div>
    </li>
  );
};
export default UserCard;
