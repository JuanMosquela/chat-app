import { googleLogout } from "@react-oauth/google";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { selectAuth } from "../redux/slices/auth.slice";
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

const logOut = () => {
  googleLogout();
  localStorage.clear();
};

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const auth = useSelector(selectAuth);

  useEffect(() => {
    console.log(auth);
    if (auth.token) navigate(from);
  }, [auth]);

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};
export default Chat;
