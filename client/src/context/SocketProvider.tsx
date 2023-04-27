import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContextType, SocketProviderProps } from "../types/socket.types";

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  users: [],
  messages: [],
});

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = io(
      import.meta.env.DEV
        ? "http://localhost:8080"
        : "https://chat-app-api-mba6.onrender.com",
      {
        extraHeaders: {
          "x-token": localStorage.getItem("token") || "",
        },
      }
    );

    setSocket(newSocket);
  }, []);

  useEffect(() => {
    socket?.on("online_users", (users: any) => {
      setUsers(users);
    });

    socket?.on("recive_message", (payload) => {
      setMessages((prev) => [...prev, payload]);
    });
  }, [socket]);

  console.log(messages);

  return (
    <SocketContext.Provider value={{ socket, users, messages }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
