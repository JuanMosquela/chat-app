import { googleLogout } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { logout, selectAuth } from "../redux/slices/auth.slice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
console.log(import.meta.env.DEV);

const socket = io(
  import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://chat-app-api-mba6.onrender.com"
);

socket.on("connect", () => {
  console.log("Conectado al servidor de Socket.IO");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor de Socket.IO");
});

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const auth = useSelector(selectAuth);

  const logOut = () => {
    googleLogout();
    localStorage.clear();
    navigate("/login");
    dispatch(logout());

    console.log(auth);
  };

  return (
    <div className="p-4">
      {auth.token && (
        // <div>
        //   <img
        //     className="w-[400px] h-[400px object-cover "
        //     src={auth.user.picture}
        //     alt={`${auth.user.username} picture`}
        //   />
        //   <h1>{auth.user.username}</h1>
        //   <span>{auth.user.email}</span>
        // </div>
        <div>
          <img
            className="rounded-full w-[200px]"
            src={auth.picture}
            alt={`${auth.username} profile picture`}
          />
          <h1>{auth.username}</h1>
          <h2>{auth.email}</h2>
        </div>
      )}
      <button onClick={() => logOut()}>Sign Out</button>
    </div>
  );
};
export default Chat;
