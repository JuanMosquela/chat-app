import { Request, Response } from "express";
import Conversation from "../models/conversation.model";

const createConversation = async (req: Request, res: Response) => {
  const { from, to } = req.body;
  try {
    const conversation = new Conversation({
      members: [from, to],
    });

    conversation.save();

    res.status(200).json({
      msg: "conversation created",
      conversation,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getConversation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const conversation = await Conversation.find({ members: { $in: [id] } });

    if (!conversation) {
      res.status(401).send({ msg: `No conversation with this ${id}` });
    }

    res.status(201).send(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { createConversation, getConversation };
