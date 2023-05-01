import { Request, Response } from "express";
import Conversation from "../models/conversation.model";
import User from "../models/user.model";

const createConversation = async (req: Request, res: Response) => {
  const { from, to } = req.body;
  console.log(from);

  try {
    const [sender, receiver] = await Promise.all([
      await User.findById(from),
      await User.findById(to),
    ]);

    const conversation = new Conversation({
      members: [sender, receiver],
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
    const conversation = await Conversation.find({
      members: { $in: [id] },
    }).populate("members");

    if (!conversation) {
      res.status(401).send({ msg: `No conversation with this ${id}` });
    }

    res.status(201).send(conversation);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { createConversation, getConversation };
