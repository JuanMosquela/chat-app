"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const google_verify_1 = require("../utils/google-verify");
const generate_token_1 = __importDefault(require("../utils/generate-token"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // const { file }: any = req.files;
        const exist = yield user_model_1.default.findOne({ email });
        const hashed_password = bcrypt_1.default.hashSync(password, 10);
        if (exist) {
            return res.status(409).json({
                msg: "This user already exist",
            });
        }
        const user = new user_model_1.default({
            username,
            email,
            password: hashed_password,
        });
        // if (file) {
        //   const { tempFilePath } = file;
        //   const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
        //     folder: "chat-app/users",
        //   });
        //   user.picture = secure_url;
        // }
        user.save();
        const token = yield (0, generate_token_1.default)(user.id);
        res.status(201).json({
            msg: "User login successfull",
            user,
            token,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identifier, password } = req.body;
        const exist = yield user_model_1.default.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });
        if (!exist) {
            return res.status(401).send("This user dosent exist");
        }
        const check_password = yield bcrypt_1.default.compare(password, exist.password);
        if (!check_password) {
            return res.status(404).json({ msg: "Passwords doesn´t match" });
        }
        const token = yield (0, generate_token_1.default)(exist.id);
        res.status(200).json({
            msg: "User login successfull",
            user: exist,
            token,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.login = login;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        // desestructuramos el token y consegimos datos
        let { email, picture, username } = (yield (0, google_verify_1.verifyGoogle)(id_token));
        // corroboramos si existe en la base de datos
        const exist = yield user_model_1.default.findOne({ email });
        // si no existe lo creamos
        if (!exist) {
            const user = new user_model_1.default({
                email,
                picture,
                username,
                password: ":P",
                google: true,
            });
            yield user.save();
            let token = yield (0, generate_token_1.default)(user.id);
            if (!token) {
                return res.send({
                    message: "no se pudo validar al usuario",
                    valid: false,
                });
            }
            return res.status(201).json({
                user,
                token,
            });
            //   enviar(update,"bienvenida")
        }
        // si existe el usuario
        // const update: any = await User.findOne({ email: exist.email }).select(
        //   "-password"
        // );
        if ((exist === null || exist === void 0 ? void 0 : exist.state) == false) {
            return res.status(401).json({
                msg: "This user was disabled",
            });
        }
        let token = yield (0, generate_token_1.default)(exist.id);
        if (!token) {
            return res.send({
                message: "no se pudo validar al usuario",
                valid: false,
            });
        }
        // enviar(update,"bienvenida")
        return res.status(201).json({
            user: exist,
            token,
        });
    }
    catch (error) {
        console.log(error.message);
        res.send({
            message: "La validacion con google no fue posible intentelo despues",
            valid: false,
        });
    }
});
exports.googleLogin = googleLogin;
