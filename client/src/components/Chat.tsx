import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../context/SocketProvider";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";
import MessageBox from "./MessageBox";
import { selectChat } from "../redux/slices/chat.slice";
import noPicture from "../assets/user.png";
import { format } from "timeago.js";
import noProfile from "../assets/user.png";
import Welcome from "./Welcome";
import ThemeColor from "./ThemeColor";
import { selectTheme } from "../redux/slices/theme.slice";

const Chat = () => {
  const { socket, messages } = useContext(SocketContext);
  const { headingColor, textColor, backgroundColor, messageMe, messageAll } =
    useSelector(selectTheme);

  const { currentChat, currentUserChat, currentPictureChat } =
    useSelector(selectChat);
  const { id } = useSelector(selectAuth);
  const scroll = useRef<any>();

  console.log(messageMe, messageAll);

  useEffect(() => {
    socket?.on("recive_message", (message) => console.log(message));
  }, []);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`flex   flex-col ${
        currentChat ? `${backgroundColor}` : "bg-soft_dark"
      }  w-[70%] `}
    >
      {currentChat ? (
        <>
          <div
            className={`${headingColor} flex justify-between items-center  h-[60px] p-4  `}
          >
            <div className="flex gap-4">
              <img
                className="w-8 rounded-full"
                src={currentPictureChat ? currentPictureChat : noPicture}
                alt=""
              />
              <h4 className={`${textColor}`}>{currentUserChat}</h4>
            </div>
            <ThemeColor />
          </div>

          <ul className="p-4 h-full overflow-y-scroll">
            {messages?.map((item: any, index: number) => (
              <li
                ref={scroll}
                key={index}
                className={`flex   items-center  gap-2  py-2 px-4 rounded-md  mb-2 w-fit ${textColor} ${
                  id == item.from ? `ml-auto ${messageMe}` : `${messageAll}`
                }`}
              >
                <img
                  className="rounded-full w-10"
                  src={item?.picture ? item.picture : noProfile}
                  alt={item.username}
                />

                <div>
                  <p className="text-sm mb-1">{item.message}</p>
                  <span className="text-xs  block text-end ">
                    {format(item.createdAt)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <MessageBox />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
};
export default Chat;
