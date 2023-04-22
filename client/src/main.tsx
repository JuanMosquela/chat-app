import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../dist/output.css";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Register from "./pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="525882776971-5d7vpp4ptsl894bvp8mer96mr3sv64j8.apps.googleusercontent.com">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<Chat />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
