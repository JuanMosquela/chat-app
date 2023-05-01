import { useNavigate } from "react-router-dom";
import EmptyPicture from "./EmptyPicture";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../redux/slices/auth.slice";
import { googleLogout } from "@react-oauth/google";
import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketProvider";
import noProfile from "../assets/user.png";
import MenuButton from "./MenuButton";
import { BiSearchAlt2 } from "react-icons/bi";
import Chat from "./Chat";
import Conversation from "./Conversation";

interface SideBarProps {
  conversations: any[];
}

const Sidebar = ({ conversations }: SideBarProps) => {
  const { socket } = useContext(SocketContext);
  const { picture, id } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(conversations);

  const [selectedChat, setSelectedChat] = useState<string | undefined>(
    undefined
  );

  const handleSelected = (id: string) => {
    setSelectedChat(id);
  };

  return (
    <section className="w-1/4 bg-[#111B21] px-2">
      <div className="flex justify-between items-center bg-[#222E35] mb-2">
        <div className="px-2 py-4  ">
          <img
            className="rounded-full w-8 "
            src={picture ? picture : noProfile}
          />
        </div>
        <MenuButton />
      </div>
      <div className="flex justify-between items-center bg-[#222E35] rounded-sm p-2 mb-2">
        <BiSearchAlt2 className="text-white" />
        <input
          type="text"
          placeholder="Search for a chat"
          className="w-full ml-6  bg-[#222E35]"
        />
      </div>
      <ul className=" flex-grox ">
        {conversations &&
          conversations.map((chat) => (
            <Conversation
              key={chat._id}
              chat={chat}
              currentUserId={id}
              handleSelected={handleSelected}
              selectedChat={selectedChat}
            />
          ))}
      </ul>
    </section>
  );
};
export default Sidebar;
