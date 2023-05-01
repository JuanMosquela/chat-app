import express from "express";
import cors from "cors";
import "dotenv/config.js";
import fileUpload from "express-fileupload";
import { genericRouter } from "./routes/routes";
import connectDatabase from "./config/db.config";
import http from "http";
import { Server, Socket } from "socket.io";
import { socketController } from "./controllers/socket.controller";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const app = express();
const server = http.createServer(app);

app.use(cors());

// Configurar el servidor de Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

connectDatabase();

app.use("/api", genericRouter);

io.on(
  "connection",
  (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) => {
    (async () => {
      await socketController(socket, io);
    })().catch((error) => console.error(error));
  }
);

server.listen(PORT, () => {
  console.log(`servidor levantado en el puerto ${PORT}`);
});
