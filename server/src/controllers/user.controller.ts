import { Request, Response } from "express";
import { RequestUserId } from "../types";
import User from "../models/user.model";
import cloudinary from "../config/cloudinary.config";
import { FileArray, UploadedFile } from "express-fileupload";

const getAllUsers = async (req: RequestUserId, res: Response) => {
  try {
    const userId = req.userId;

    const users = await User.find({ $nor: [{ _id: userId }] });

    if (!users) {
      return res.status(400).json({ msg: "No users found" });
    }

    res.status(201).send(users);
  } catch (error) {
    res.status(501).send(error);
  }
};

const getUser = async (req: RequestUserId, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        msg: "No user found",
      });
    }

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const editUser = async (req: RequestUserId, res: Response) => {
  try {
    const userId = req.userId;
    const { username, description } = req.body;
    const { picture }: any = req.files || {};

    const user = await User.findByIdAndUpdate(
      userId,
      {
        username,
        description,
      },
      { new: true }
    );

    if (!user) {
      return res.status(401).json({
        msg: "No user found",
      });
    }

    if (picture) {
      if (user.picture) {
        const imgArray = user.picture.split("/");
        const name = imgArray[imgArray.length - 1];
        const [public_id] = name.split(".");

        cloudinary.uploader.destroy(public_id);
      }

      const { tempFilePath } = picture;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

      user.picture = secure_url;
      await user.save();
    }

    res.status(200).json({
      msg: "User edited succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export { getAllUsers, getUser, editUser };
