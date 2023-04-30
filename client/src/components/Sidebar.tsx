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

interface SideBarProps {
  users: any[];
}

const Sidebar = ({ users }: SideBarProps) => {
  const { socket } = useContext(SocketContext);
  const { picture } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelected = (id: string) => {
    setSelectedChat(id);
  };

  const logOut = () => {
    googleLogout();
    socket?.emit("user-disconnected");
    localStorage.clear();
    navigate("/login");
    dispatch(logout());
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
        {users?.map((user: any) => (
          <li
            key={user._id}
            onClick={() => handleSelected(user._id)}
            className={`flex items-center gap-2   p-2 rounded-md bg-[#111B21] text-white hover:bg-[#222E35] ${
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
        ))}
      </ul>
    </section>
  );
};
export default Sidebar;
