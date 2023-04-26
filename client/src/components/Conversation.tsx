import { useSelector } from "react-redux";
import MessageBox from "./MessageBox";
import { useEffect, useState } from "react";
import { selectAuth } from "../redux/slices/auth.slice";
import EmptyPicture from "./EmptyPicture";
import { AnyAaaaRecord } from "dns";
import { io } from "socket.io-client";
import { RiSendPlane2Fill } from "react-icons/ri";

interface ConversationProps {
  socket: AnyAaaaRecord;
}

const Conversation = () => {
  const socket = io(
    import.meta.env.DEV
      ? "http://localhost:5000"
      : "https://chat-app-api-mba6.onrender.com",
    {
      extraHeaders: {
        "x-token": localStorage.getItem("token") || "",
      },
    }
  );

  socket.on("connect", () => {
    console.log("Conectado al servidor de Socket.IO");
  });
  socket.on("disconnect", () => {
    console.log("Desconectado del servidor de Socket.IO");
  });

  const { username, picture } = useSelector(selectAuth);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const handleMessage = (e: any) => {
    e.preventDefault();
    socket.emit("send-message", message);
    setMessage("");
  };

  useEffect(() => {
    const reciveMessage = (payload: any) => {
      let { message, username, picture } = payload;
      setMessages((prev: any) => [
        ...prev,
        {
          username,
          picture,
          message,
          date: new Date(),
        },
      ]);
    };
    socket.on("send-message", reciveMessage);

    return () => {
      socket.off("send-message", reciveMessage);
    };
  }, []);

  return (
    <div className="flex flex-col justify-between bg-blue w-full p-4">
      <div>
        <h1 className="mb-4">Conversation</h1>
        <ul>
          {messages.map((item: any, index: number) => (
            <li
              key={index}
              className="flex items-center gap-2   p-2 rounded-md bg-gray mb-2"
            >
              {item.picture ? (
                <img
                  className="rounded-full w-10"
                  src={item?.picture}
                  alt={item.username}
                />
              ) : (
                <EmptyPicture char={item.username[0]} />
              )}

              <div>
                <h3>{item.username}</h3>
                <p>{item.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form
        onSubmit={handleMessage}
        className="bg-gray flex justify-around items-center px-6 py-4 rounded-md "
      >
        <input
          className="rounded-md w-full outline-none text-md"
          type="text"
          value={message}
          placeholder="Enviar mensaje ..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <RiSendPlane2Fill />
      </form>
    </div>
  );
};
export default Conversation;
