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
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

export default Message;
