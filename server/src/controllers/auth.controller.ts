import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { verifyGoogle } from "../utils/google-verify";
import generateToken from "../utils/generate-token";
import cloudinary from "../config/cloudinary.config";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

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

  try {
    const { email, name, picture } = id_token;

    const exist = await User.findOne({ email });

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

    if (exist?.state == false) {
      return res.status(401).json({
        msg: "This user was disabled",
      });
    }

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
