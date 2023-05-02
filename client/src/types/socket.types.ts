import { Socket } from "socket.io-client";

export type SocketContextType = {
  socket: Socket | null;
  users: any;
  messages: any;
  setMessages: any;
};

export type SocketProviderProps = {
  children: React.ReactNode;
};
