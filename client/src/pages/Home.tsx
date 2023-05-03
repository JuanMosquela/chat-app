import { useSelector } from "react-redux";

import { selectAuth } from "../redux/slices/auth.slice";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useGetConversationQuery } from "../redux/api/conversationApi";
import { useEffect } from "react";
import SocketProvider from "../context/SocketProvider";

const Home = () => {
  const { id } = useSelector(selectAuth);

  const { data } = useGetConversationQuery(id);

  return (
    <SocketProvider>
      <div className=" bg-[#10191F]  ">
        <div className="container flex flex-row min-h-screen">
          <Sidebar conversations={data} />
          <Chat />
        </div>
      </div>
    </SocketProvider>
  );
};
export default Home;
