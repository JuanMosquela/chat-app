import { useState, useContext } from "react";
import { AiOutlineSend } from "react-icons/ai";

import { FiPaperclip } from "react-icons/fi";
import InputEmoji from "react-input-emoji";
import { SocketContext } from "../context/SocketProvider";
import { useSelector } from "react-redux";
import { selectChat } from "../redux/slices/chat.slice";
import { selectAuth } from "../redux/slices/auth.slice";
import { useCreateMessageMutation } from "../redux/api/messagesApi";
import axios from "axios";

const MessageBox = () => {
  const { socket, messages, setMessages } = useContext(SocketContext);
  const { id, picture } = useSelector(selectAuth);
  const { currentChat } = useSelector(selectChat);
  const [newMessage, setNewMessage] = useState("");

  const [createMessage, { data }] = useCreateMessageMutation();

  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };

  const saveMessage = async (message: any) => {
    console.log(message);
    await axios.post("http://localhost:5000/api/message", message);
  };

  function handleOnEnter() {
    try {
      const createdMessage = {
        conversationId: currentChat,
        from: id,
        message: newMessage,
        picture,
      };

      setMessages([...messages, createdMessage]);
      setNewMessage("");
      saveMessage(createdMessage);
      socket?.emit("send_message", createdMessage);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#222E35]  px-6 py-2 rounded-md text-white">
      <div className="flex  w-full items-center gap-4">
        <FiPaperclip className="text-2xl" />
        <InputEmoji
          value={newMessage}
          onChange={handleChange}
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />

        <button
          type="submit"
          className="w-[50px] h-[50px] flex justify-center items-center rounded-md"
        >
          <AiOutlineSend
            className="text-xl text-white"
            onClick={handleOnEnter}
          />
        </button>
      </div>
    </div>
  );
};
export default MessageBox;
