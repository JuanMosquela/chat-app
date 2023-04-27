import Sidebar from "../components/Sidebar";
import Conversation from "../components/Conversation";

const Chat = () => {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar />
      <Conversation />
    </div>
  );
};
export default Chat;
