import Chat from "../pages/Chat";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const token = true;
  const navigate = useNavigate();
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    navigate("/login", { state: { from: location }, replace: true })
  );
};
export default ProtectedRoute;
