import { Socket } from "socket.io";
import { verifySocketToken } from "../utils/verify-token";
import User from "../models/user.model";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let onlineUsers = [];
let messages = [];

const addUser = (currentUser: any, socket, state: boolean) => {
  if (!onlineUsers.some((element) => element.user.id === currentUser.id)) {
    onlineUsers.push({
      user: currentUser,
      socketId: socket.id,
      online: state,
    });
  }
};

const disconnectUser = (socketId: string) => {
  const disconnectedUser = onlineUsers.find((user) => {
    return user.socketId !== socketId;
  });

  disconnectedUser.online = false;
};

const socketController = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  io: any
) => {
  const user = await verifySocketToken(socket.handshake.headers["x-token"]);

  if (!user) {
    return socket.disconnect();
  }

  addUser(user, socket, true);

  console.log(`Se conecto el usuario ${user.username}`);
  console.log(onlineUsers);

  io.emit("load_messages", messages);

  io.emit("online_users", onlineUsers);

  socket.on("send_message", (message) => {
    socket.broadcast.emit("recive_message", message);
  });

  socket.on("user-disconnected", () => {
    console.log("se desconecto el user " + user.username);
    disconnectUser(socket.id);
    console.log(onlineUsers);
    io.emit("online_users", onlineUsers);
    socket.disconnect();
  });
};

export { socketController };
