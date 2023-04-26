import { Socket } from "socket.io";
import { verifySocketToken } from "../utils/verify-token";
import User from "../models/user.model";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let users = {};
let messages = [];

const getMessages = () => {
  return messages;
};

const getUsers = () => {
  return Object.values(users);
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
  console.log(messages[0]);
};

const connectUser = (user) => {
  users[user.id] = user;
};

const disconnectUser = (id: any) => {
  delete users[id];
};

const socketController = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  io: any
) => {
  const user = await verifySocketToken(socket.handshake.headers["x-token"]);

  if (!user) {
    return socket.disconnect();
  }

  console.log(`Se conecto el usuario ${user.username}`);

  socket.on("send-message", (message) => {
    saveMessage(user.id, user.username, message, user.picture);

    socket.broadcast.emit("send-message", messages[0]);
  });

  // connectUser(user);
  // io.emit("usuarios-activos", getUsers());
  // io.emit("recibir-mensaje", messages);

  // socket.on("enviar-mensaje", (message) => {
  //   console.log(message);
  //   saveMessage(user.id, user.username, message, user.picture);
  //   socket.emit("recibir-mensaje", messages);
  // });

  socket.on("disconnect", () => {
    console.log(socket.client + "usuario desconectado");
    disconnectUser(user.id);
    io.emit("usuarios-activos", getUsers);
  });
};

export { socketController };
