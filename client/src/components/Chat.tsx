import { useState, useContext } from "react";
import EmptyPicture from "./EmptyPicture";
import { RiSendPlane2Fill } from "react-icons/ri";
import { SocketContext } from "../context/SocketProvider";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";
import MessageBox from "./MessageBox";

const Chat = () => {
  const { socket, messages } = useContext(SocketContext);
  const { id } = useSelector(selectAuth);

  const [message, setMessage] = useState("");

  const handleMessage = (e: any) => {
    e.preventDefault();
    socket?.emit("send_message", message);
    setMessage("");
  };

  return (
    <div className="flex w-full flex-col  min-h-screen bg-[#10191F]  p-4">
      <div className="flex-grow ">
        <ul>
          {messages.map((item: any, index: number) => (
            <li
              key={index}
              className={`flex   items-center  gap-2  py-2 px-4 rounded-md  mb-2 w-fit ${
                id === item.id ? "ml-auto bg-blue" : " bg-gray"
              }`}
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
      <MessageBox
        handleMessage={handleMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};
export default Chat;
