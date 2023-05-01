import { useSelector } from "react-redux";

import { selectAuth } from "../redux/slices/auth.slice";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useGetConversationQuery } from "../redux/api/conversationApi";
import { useEffect } from "react";

const Home = () => {
  const { id } = useSelector(selectAuth);

  const { data } = useGetConversationQuery(id);

  return (
    <div className="flex min-h-screen  ">
      <Sidebar conversations={data} />
      <Chat />
    </div>
  );
};
export default Home;
