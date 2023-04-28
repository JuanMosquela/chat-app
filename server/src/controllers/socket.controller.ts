import { Socket } from "socket.io";
import { verifySocketToken } from "../utils/verify-token";
import User from "../models/user.model";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let users = [];
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

const addUser = (user) => {
  console.log(user);
  const userExist = users.find((item) => {
    return user.id === item.id;
  });

  if (!userExist) {
    users.push(user);
  }
};

const removeUser = (userId) => {
  users = users.filter((item) => {
    return userId !== item.id;
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

  addUser(user);
  console.log(users);

  console.log(`Se conecto el usuario ${user.username}`);

  // connectUser(user);

  io.emit("load_messages", messages);

  io.emit("online_users", users);

  socket.on("send_message", (message) => {
    saveMessage(user.id, user.username, message, user.picture);
    console.log(messages);

    io.emit("recive_message", messages[0]);
  });

  socket.on("user-disconnected", () => {
    console.log("se desconecto el user " + user.username);
    removeUser(user.id);
    console.log(users);
    io.emit("online_users", users);
    socket.disconnect();
  });
};

export { socketController };
