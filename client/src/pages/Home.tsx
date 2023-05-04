import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import SocketProvider from "../context/SocketProvider";

const Home = () => {
  return (
    <SocketProvider>
      <div className=" bg-[#10191F]  ">
        <div className="container flex flex-row min-h-screen">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </SocketProvider>
  );
};
export default Home;
