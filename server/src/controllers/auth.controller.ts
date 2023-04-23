import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { verifyGoogle } from "../utils/google-verify";
import generateToken from "../utils/generate-token";
import cloudinary from "../config/cloudinary.config";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    // const { file }: any = req.files;

    const exist = await User.findOne({ email });

    const hashed_password = bcrypt.hashSync(password, 10);

    if (exist) {
      return res.status(409).json({
        msg: "This user already exist",
      });
    }

    const user = new User({
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

    const token = await generateToken(user.id);

    res.status(201).json({
      msg: "User login successfull",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    const exist = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!exist) {
      return res.status(401).send("This user dosent exist");
    }

    const check_password = await bcrypt.compare(password, exist.password);

    if (!check_password) {
      return res.status(404).json({ msg: "Passwords doesn´t match" });
    }

    const token = await generateToken(exist.id);

    res.status(200).json({
      msg: "User login successfull",
      user: exist,
      token,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const googleLogin = async (req: Request, res: Response) => {
  const { id_token } = req.body;
  console.log(id_token);
  console.log("esa fue la dta");

  interface TokenPayload {
    picture?: string;
    email?: string;
    username?: string;
  }

  try {
    // desestructuramos el token y consegimos datos

    // let { email, picture, username } = (await verifyGoogle(
    //   id_token
    // )) as TokenPayload;

    const { email, name, picture } = id_token;

    console.log(email);

    // corroboramos si existe en la base de datos

    const exist = await User.findOne({ email });

    console.log(exist);

    // si no existe lo creamos

    if (!exist) {
      const user = new User({
        email,
        picture,
        username: name,
        password: ":P",
        google: true,
      });

      await user.save();

      let token = await generateToken(user.id);
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

    if (exist?.state == false) {
      return res.status(401).json({
        msg: "This user was disabled",
      });
    }

    console.log(exist.id);

    let token = await generateToken(exist.id);
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
  } catch (error: any) {
    console.log(error);
    res.send({
      message: "La validacion con google no fue posible intentelo despues",
      valid: false,
    });
  }
};

export { register, login, googleLogin };
