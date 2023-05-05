import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import SocketProvider from "../context/SocketProvider";
import { useSelector } from "react-redux";
import { selectTheme } from "../redux/slices/theme.slice";

const Home = () => {
  const { theme, backgroundColor, background } = useSelector(selectTheme);
  return (
    <SocketProvider>
      <div className={`${background} duration-150 `}>
        <div className="container flex flex-row min-h-screen">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </SocketProvider>
  );
};
export default Home;
