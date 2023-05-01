import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiLaughing } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";

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
      className="bg-[#222E35]  px-6 rounded-md text-white"
    >
      <div className="flex  w-full items-center gap-4">
        <BsEmojiLaughing className="text-2xl" />
        <FiPaperclip className="text-2xl" />
        <input
          className="rounded-md ml-2 w-full outline-none text-md bg-[#222E35] text-white"
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
      </div>
    </form>
  );
};
export default MessageBox;
