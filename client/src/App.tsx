import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="  ">
      <Outlet />
    </div>
  );
}

export default App;
