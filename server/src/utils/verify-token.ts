import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { RequestUserId, IPayload } from "../types";

import User from "../models/user.model";

console.log(process.env.JWT_SECRET_KEY);

const verifySocketToken = async (token) => {
  try {
    if (token.length < 10) {
      return null;
    }

    const tokenWithoutQuotes = token.replace(/["']/g, "");

    const { id } = jwt.verify(
      tokenWithoutQuotes,
      process.env.JWT_SECRET_KEY
    ) as IPayload;

    const user = await User.findById(id);

    if (user) {
      if (user.state) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return console.log(error);
  }
};

export { verifySocketToken };
