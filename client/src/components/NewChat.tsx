import { Dispatch, SetStateAction, useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useGetUsersQuery } from "../redux/api/userApi";
import UserCard from "./UserCard";
import User from "../types/user";
import { BiSearchAlt2 } from "react-icons/bi";
import { useGetConversationQuery } from "../redux/api/conversationApi";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";

interface OpenProps {
  open: any;
  handleOpen: (state: boolean, mode: string) => void;
  selectedChat: string | undefined;
}

const NewChat = ({ open, handleOpen, selectedChat }: OpenProps) => {
  const { data, isLoading } = useGetUsersQuery(undefined);
  const { id } = useSelector(selectAuth);
  const { data: conversationsData } = useGetConversationQuery(id);

  return (
    <div
      className={`flex flex-col pr-2 absolute w-full bg-dark top-0 gap-2 bottom-0 duration-200 delay-100 ${
        open.state && open.mode == "chat" ? "mr-[100%]  " : "ml-[-100%] "
      }  text-white   `}
    >
      <div className=" flex items-center gap-4 h-20 bg-soft_dark rounded-l-md">
        <BsArrowLeftShort
          className="text-4xl cursor-pointer"
          onClick={() => handleOpen(false, "chat")}
        />
        <h1 className="font-bold text-xl capitalize">new chat</h1>
      </div>
      <div className="flex justify-between items-center bg-soft_dark rounded-sm p-2 mb-2">
        <BiSearchAlt2 className="text-white" />
        <input
          type="text"
          placeholder="Search for a chat"
          className="w-full ml-6 outline-none text-white  bg-soft_dark"
        />
      </div>

      <ul onClick={() => handleOpen(false, "chat")}>
        {data?.map((user: User) => (
          <UserCard key={user._id} user={user} selectedChat={selectedChat} />
        ))}
      </ul>
    </div>
  );
};
export default NewChat;
