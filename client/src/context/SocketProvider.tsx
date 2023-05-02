import { createContext, useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContextType, SocketProviderProps } from "../types/socket.types";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectChat } from "../redux/slices/chat.slice";

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  users: [],
  messages: [],
  setMessages: () => {},
});

interface WebSocketInterface {
  disconnect(): void;
  emit(event: string, ...args: any[]): void;
  on(event: string, listener: (...args: any[]) => void): void;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const socketRef = useRef<Socket | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const { currentChat } = useSelector(selectChat);

  useEffect(() => {
    socketRef.current = io(
      import.meta.env.DEV
        ? "http://localhost:5000"
        : "https://chat-app-api-mba6.onrender.com",
      {
        extraHeaders: {
          "x-token": localStorage.getItem("token") || "",
        },
      }
    );
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/message/${currentChat}`
        );
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    socketRef.current?.on("online_users", (users: string[]) => {
      setUsers(users);
    });

    socketRef.current?.on("recive_message", (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  console.log(messages);

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, users, messages, setMessages }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
