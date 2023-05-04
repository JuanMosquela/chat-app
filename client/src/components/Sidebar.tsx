import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";
import { useState } from "react";
import noProfile from "../assets/user.png";
import MenuButton from "./MenuButton";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import NewChat from "./NewChat";
import { useGetConversationQuery } from "../redux/api/conversationApi";
import UserCard from "./UserCard";
import Profile from "./Profile";
import Search from "./Search";

const Sidebar = () => {
  const { picture } = useSelector(selectAuth);
  const [selectedChat, setSelectedChat] = useState<string | undefined>(
    undefined
  );
  const { id } = useSelector(selectAuth);
  const { data } = useGetConversationQuery(id);
  const [open, setOpen] = useState({
    state: false,
    mode: "",
  });
  const [search, setSearch] = useState("");

  const handleSelected = (id: string) => {
    setSelectedChat(id);
  };

  const handleOpen = (state: boolean, mode: string) => {
    console.log(state, mode);
    setOpen({
      state,
      mode,
    });
  };

  return (
    <section className=" w-[30%] bg-[#111B21] pr-2 border border-x-white/20 overflow-hidden relative">
      <Profile open={open} handleOpen={handleOpen} />
      <NewChat
        open={open}
        handleOpen={handleOpen}
        selectedChat={selectedChat}
      />
      <div className="flex justify-between items-center bg-soft_dark mb-2">
        <div
          className="px-2 py-4  "
          onClick={() => handleOpen(true, "profile")}
        >
          <img
            className="rounded-full w-8 "
            src={picture ? picture : noProfile}
          />
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <BsFillChatLeftTextFill
            className="cursor-pointer"
            onClick={() => handleOpen(true, "chat")}
          />
          <MenuButton />
        </div>
      </div>
      <Search search={search} setSearch={setSearch} />
      <ul>
        {data &&
          data.map((chat: any) =>
            chat?.members.map(
              (user: any, index: number) =>
                user._id !== id &&
                user.username.toLowerCase().includes(search.toLowerCase()) && (
                  <>
                    <UserCard
                      key={user._id}
                      user={user}
                      chat={chat}
                      selectedChat={selectedChat}
                    />
                  </>
                )
            )
          )}
      </ul>
    </section>
  );
};
export default Sidebar;
