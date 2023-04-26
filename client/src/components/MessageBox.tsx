import { useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth.slice";

interface MessageBoxProps {
  handleMessage: any;
}

const MessageBox = ({ handleMessage }: MessageBoxProps) => {
  const [message, setMessage] = useState("");

  return (
    <form className="bg-gray flex justify-around items-center px-6 py-4 rounded-md ">
      <input
        className="rounded-md w-full outline-none text-md"
        type="text"
        placeholder="Enviar mensaje ..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <RiSendPlane2Fill onClick={() => handleMessage(message)} />
    </form>
  );
};
export default MessageBox;
