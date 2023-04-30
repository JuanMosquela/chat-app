import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
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
      className="bg-[#3D4354] flex  w-full items-center px-2 rounded-md "
    >
      <input
        className="rounded-md ml-2 w-full outline-none text-md bg-[#3D4354] text-letter"
        type="text"
        placeholder="Enviar mensaje ..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="w-[50px] h-[50px] flex justify-center items-center rounded-md"
      >
        <AiOutlineSend className="text-xl text-white" />
      </button>
    </form>
  );
};
export default MessageBox;
