import { Response } from "express";
import { RequestUserId } from "../types";
import User from "../models/user.model";

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

export { getAllUsers };
