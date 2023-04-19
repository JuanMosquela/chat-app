import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";

const Router = () => {
  return (
    <Routes>
      <Route index element={<Chat />} />
    </Routes>
  );
};
export default Router;
