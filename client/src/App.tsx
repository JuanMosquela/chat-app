import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    import.meta.env.DEV
      ? console.log("estoy en desarrollo")
      : console.log("estopy en produccion");
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
