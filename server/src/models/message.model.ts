import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    from: {
      type: String,
    },
    message: {
      type: String,
    },
    picture: {
      type: String,
    },
    time: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

export default Message;
