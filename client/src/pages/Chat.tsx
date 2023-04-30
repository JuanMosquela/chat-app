import Conversation from "../components/Conversation";
import Sidebar from "../components/Sidebar";
import { useGetUsersQuery } from "../redux/api/userApi";

const Chat = () => {
  const { data } = useGetUsersQuery(undefined);

  console.log(data);

  return (
    <div className="flex min-h-screen  ">
      <Sidebar users={data} />
      <Conversation />
    </div>
  );
};
export default Chat;
