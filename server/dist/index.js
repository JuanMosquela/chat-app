"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config.js");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = require("./routes/routes");
const db_config_1 = __importDefault(require("./config/db.config"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use((0, cors_1.default)(corsOptions));
// Configurar el servidor de Socket.IO
const io = new socket_io_1.Server(server, {
    cors: corsOptions,
});
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
}));
(0, db_config_1.default)();
// app.use("/", (req, res) => {
//   res.send("hola mundo");
// });
app.use("/api", routes_1.genericRouter);
io.on("connect", (socket) => {
    console.log("cliente conectado " + socket.id);
});
server.listen(PORT, () => {
    console.log(`servidor levantado en el puerto ${PORT}`);
});
