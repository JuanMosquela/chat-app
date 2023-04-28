import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../dist/output.css";
import Chat from "./pages/GlobalChat";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Register from "./pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SocketProvider from "./context/SocketProvider";
import PrivateChat from "./pages/PrivateChat";
import GlobalChat from "./pages/GlobalChat";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<GlobalChat />} />
              <Route path="/:id" element={<PrivateChat />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
