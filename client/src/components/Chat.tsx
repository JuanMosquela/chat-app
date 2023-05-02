import { useState, useContext, useEffect } from "react";

import { RiSendPlane2Fill } from "react-icons/ri";
import { SocketContext } from "../context/SocketProvider";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";
import MessageBox from "./MessageBox";
import { selectChat } from "../redux/slices/chat.slice";
import noPicture from "../assets/user.png";
import { format } from "timeago.js";
import { useGetMessagesQuery } from "../redux/api/messagesApi";
import noProfile from "../assets/user.png";
import Welcome from "./Welcome";

const Chat = () => {
  const { socket, messages } = useContext(SocketContext);

  const { currentChat, currentUserChat, currentPictureChat } =
    useSelector(selectChat);
  const { id } = useSelector(selectAuth);
  // const { data } = useGetMessagesQuery(currentChat);

  // console.log(data);
  console.log(currentUserChat);

  useEffect(() => {
    socket?.on("recive_message", (message) => console.log(message));
  }, []);

  return (
    <div className="flex w-full flex-col  min-h-screen bg-[#10191F] ">
      {currentChat ? (
        <>
          <div className="bg-[#222E35] flex items-center gap-4 p-4">
            <img
              className="w-8 rounded-full"
              src={currentPictureChat ? currentPictureChat : noPicture}
              alt=""
            />
            <h4 className="text-white">{currentUserChat}</h4>
          </div>
          <div className="flex-grow  ">
            <ul className="p-4">
              {messages?.map((item: any, index: number) => (
                <li
                  key={index}
                  className={`flex   items-center  gap-2  py-2 px-4 rounded-md  mb-2 w-fit text-white ${
                    id == item.from ? "ml-auto bg-[#005C4B] " : " bg-[#202C33]"
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
          </div>
          <MessageBox />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
};
export default Chat;
