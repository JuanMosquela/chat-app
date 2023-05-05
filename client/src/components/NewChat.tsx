import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useGetUsersQuery } from "../redux/api/userApi";
import UserCard from "./UserCard";
import User from "../types/user";
import { BiSearchAlt2 } from "react-icons/bi";
import { useGetConversationQuery } from "../redux/api/conversationApi";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";
import Search from "./Search";
import { selectTheme } from "../redux/slices/theme.slice";

interface OpenProps {
  open: any;
  handleOpen: (state: boolean, mode: string) => void;
  selectedChat: string | undefined;
}

const NewChat = ({ open, handleOpen, selectedChat }: OpenProps) => {
  const { data } = useGetUsersQuery(undefined);
  const { textColor, backgroundColor, headingColor } = useSelector(selectTheme);
  const [search, setSearch] = useState("");

  return (
    <div
      className={`flex flex-col pr-2 absolute w-full ${backgroundColor} top-0 gap-2 bottom-0 duration-200 delay-100 ${
        open.state && open.mode == "chat" ? "mr-[100%]  " : "ml-[-100%] "
      }  ${textColor}   `}
    >
      <div
        className={` flex items-center gap-4 h-20 ${headingColor} ${textColor} rounded-l-md`}
      >
        <BsArrowLeftShort
          className={`text-4xl cursor-pointer ${textColor}`}
          onClick={() => handleOpen(false, "chat")}
        />
        <h1 className="font-bold text-xl capitalize">new chat</h1>
      </div>
      <Search search={search} setSearch={setSearch} />

      <ul onClick={() => handleOpen(false, "chat")}>
        {data?.map(
          (user: User) =>
            user.username.toLowerCase().includes(search.toLowerCase()) && (
              <UserCard
                key={user._id}
                user={user}
                selectedChat={selectedChat}
              />
            )
        )}
      </ul>
    </div>
  );
};
export default NewChat;
