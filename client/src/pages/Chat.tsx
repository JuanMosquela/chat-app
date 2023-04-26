import { googleLogout } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { logout, selectAuth } from "../redux/slices/auth.slice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmptyPicture from "../components/EmptyPicture";
import Sidebar from "../components/Sidebar";
import Conversation from "../components/Conversation";
console.log(import.meta.env.DEV);

interface User {
  username: string;
  email: string;
  id: string;
}

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [users, setUsers] = useState<any>([]);

  const auth = useSelector(selectAuth);

  const [message, setMessage] = useState("");
  const [recivedMessage, setRecivedMessage] = useState("");

  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log("Conectado al servidor de Socket.IO");
    // });
    // socket.on("disconnect", () => {
    //   console.log("Desconectado del servidor de Socket.IO");
    // });
    // socket.on("usuarios-activos", (socketUsers) => {
    //   setUsers(socketUsers);
    //   // setUsers((prev: any) => [...prev, users]);
    // });
  }, []);

  const logOut = () => {
    googleLogout();
    localStorage.clear();
    navigate("/login");
    dispatch(logout());
  };

  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar />
      <Conversation />

      {/* <section>
        <h2>Perfil</h2>
        <div>
          <img
            className="rounded-full w-[200px]"
            src={auth.picture || ""}
            alt={`${auth.username} profile picture`}
          />
          <h1>{auth.username}</h1>
          <h2>{auth.email}</h2>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-xl mb-4">Usuarios activos</h2>
        <ul className="mb-10">
          {users?.map((user: any) => (
            <li
              key={user._id}
              className="flex items-center gap-2   p-2 rounded-md bg-gray mb-2"
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
              <p>{user.email}</p>
            </li>
          ))}
        </ul>

        <input
          type="text"
          placeholder="messages..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage}>Send message</button>

        <h1>Chat GRupal</h1>
        <ul>
          {messages?.map((item: any, index: number) => (
            <li key={index} className="flex gap-4 mb-4">
              <img
                className="w-10 rounded-full object-contain"
                src={item.picture}
                alt=""
              />
              <div className="">
                <h4>{item.username}</h4>
                <p>{item.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <button onClick={() => logOut()}>Sign Out</button> */}
    </div>
  );
};
export default Chat;
