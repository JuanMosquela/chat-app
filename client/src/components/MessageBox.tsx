import { useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";

interface MessageBoxProps {
  handleMessage: any;
  message: string;
  setMessage: any;
}

const MessageBox = ({
  handleMessage,
  message,
  setMessage,
}: MessageBoxProps) => {
  return (
    <form
      onSubmit={(e) => handleMessage(e)}
      className="bg-white flex  w-full items-center px-6 py-4 rounded-md "
    >
      <input
        className="rounded-md w-full outline-none text-md"
        type="text"
        placeholder="Enviar mensaje ..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">
        <RiSendPlane2Fill className="text-4xl" />
      </button>
    </form>
  );
};
export default MessageBox;
