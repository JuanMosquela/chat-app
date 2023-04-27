import { useNavigate } from "react-router-dom";
import EmptyPicture from "./EmptyPicture";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/auth.slice";
import { googleLogout } from "@react-oauth/google";
import { useContext } from "react";
import { SocketContext } from "../context/SocketProvider";

const Sidebar = () => {
  const { socket, users } = useContext(SocketContext);
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
    <section className="w-64 px-2">
      <div className="flex justify-between items-center">
        <h2 className=" font-bold text-xl flex justify-center items-center py-2">
          Online users
        </h2>
        <button className="bg-red text-white px-2" onClick={logOut}>
          logout
        </button>
      </div>
      <ul className="mb-10 p-2 bg-gray ">
        {Object.values(users)?.map((user: any) => (
          <li
            key={user._id}
            className="flex items-center gap-2   p-2 rounded-md bg-white mb-2"
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
