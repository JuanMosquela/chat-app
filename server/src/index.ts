import express from "express";
import cors from "cors";
import "dotenv/config.js";
import fileUpload from "express-fileupload";
import { genericRouter } from "./routes/routes";
import connectDatabase from "./config/db.config";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

// Configurar el servidor de Socket.IO
const io = new Server(server, {
  cors: corsOptions,
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

// app.use("/", (req, res) => {
//   res.send("hola mundo");
// });

app.use("/api", genericRouter);

io.on("connect", (socket) => {
  console.log("cliente conectado " + socket.id);
});

server.listen(PORT, () => {
  console.log(`servidor levantado en el puerto ${PORT}`);
});
