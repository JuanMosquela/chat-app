import { Socket } from "socket.io";
import { verifySocketToken } from "../utils/verify-token";
import User from "../models/user.model";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let onlineUsers = [];
let messages = [];

const getMessages = () => {
  return messages;
};

const saveMessage = (id, username, message, picture) => {
  console.log("entra aca");
  let newMessage = {
    id,
    username,
    message,
    picture,
  };
  messages.unshift(newMessage);
};

const addUser = (currentUser: any, socket) => {
  if (!onlineUsers.some((user) => user.id === currentUser.id)) {
    onlineUsers.push({
      user: currentUser,
      socketId: socket.id,
    });
  }
};

const removeUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user) => {
    return user.socketId !== socketId;
  });
};

const socketController = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  io: any
) => {
  const user = await verifySocketToken(socket.handshake.headers["x-token"]);

  if (!user) {
    return socket.disconnect();
  }

  addUser(user, socket);
  console.log(onlineUsers);
  console.log(`Se conecto el usuario ${user.username}`);

  io.emit("load_messages", messages);

  io.emit("online_users", onlineUsers);

  socket.on("send_message", (message) => {
    socket.broadcast.emit("recive_message", message);
  });

  socket.on("user-disconnected", () => {
    console.log("se desconecto el user " + user.username);
    removeUser(socket.id);
    console.log(onlineUsers);
    io.emit("online_users", onlineUsers);
    socket.disconnect();
  });
};

export { socketController };
