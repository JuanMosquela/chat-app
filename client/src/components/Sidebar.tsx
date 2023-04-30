import { useNavigate } from "react-router-dom";
import EmptyPicture from "./EmptyPicture";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../redux/slices/auth.slice";
import { googleLogout } from "@react-oauth/google";
import { useContext } from "react";
import { SocketContext } from "../context/SocketProvider";
import noProfile from "../assets/user.png";

interface SideBarProps {
  users: any[];
}

const Sidebar = ({ users }: SideBarProps) => {
  const { socket } = useContext(SocketContext);
  const { picture } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    googleLogout();
    socket?.emit("user-disconnected");
    localStorage.clear();
    navigate("/login");
    dispatch(logout());
  };

  return (
    <section className="w-1/4 px-2 bg-[#1B202D]">
      <div className="flex justify-between items-center">
        <div className="p-2">
          <img
            className="rounded-full w-10 "
            src={picture ? picture : noProfile}
          />
        </div>
        <button className=" text-white px-2" onClick={logOut}>
          logout
        </button>
      </div>
      <ul className=" p-2 flex-grox ">
        {users?.map((user: any) => (
          <li
            key={user._id}
            className="flex items-center gap-2   p-2 rounded-md bg-[#292F3F] text-white hover:bg-[#3D4354]"
          >
            {user.picture ? (
              <img
                className="rounded-full w-10"
                src={user?.picture}
                alt={user.username}
              />
            ) : (
              <EmptyPicture char={user.username[0]} />
            )}

            <h3>{user.username}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Sidebar;
