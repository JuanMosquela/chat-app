import { useState, useContext } from "react";
import EmptyPicture from "./EmptyPicture";
import { RiSendPlane2Fill } from "react-icons/ri";
import { SocketContext } from "../context/SocketProvider";

const Conversation = () => {
  const { socket, messages } = useContext(SocketContext);

  const [message, setMessage] = useState("");

  const handleMessage = (e: any) => {
    e.preventDefault();
    socket?.emit("send_message", message);
    setMessage("");
  };

  return (
    <div className="flex flex-col justify-between bg-blue w-full p-4">
      <div>
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
