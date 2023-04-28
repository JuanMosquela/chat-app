import { Request, Response } from "express";
import Message from "../models/message.model";

const createMessage = async (req: Request, res: Response) => {
  const { conversationId, from, message } = req.body;
  try {
    const newMessage = new Message({
      conversationId,
      from,
      message,
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
