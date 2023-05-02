import { Request, Response } from "express";
import Message from "../models/message.model";
import User from "../models/user.model";

const createMessage = async (req: Request, res: Response) => {
  console.log("intenta guardar mensaje");
  const { conversationId, from, message } = req.body;
  try {
    const { picture } = await User.findById(from).select("picture");

    const newMessage = new Message({
      conversationId,
      from,
      message,
      picture,
    });

    await newMessage.save();

    res.status(201).json({
      msg: "Message send",
      newMessage,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getMessages = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  console.log(conversationId);
  try {
    const findMessages = await Message.find({ conversationId });

    if (!findMessages) {
      return res.status(400).json({
        msg: "You dont have messages with this user",
      });
    }

    res.status(201).send(findMessages);
  } catch (error) {
    res.status(501).send(error);
  }
};

export { createMessage, getMessages };
