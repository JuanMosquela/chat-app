import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SocketProvider from "../context/SocketProvider";
import MyChats from "./MyChats";

const Layout = () => {
  return (
    <SocketProvider>
      <div className="flex min-h-screen ">
        <Sidebar />
        <Outlet />
        <MyChats />
      </div>
    </SocketProvider>
  );
};
export default Layout;
