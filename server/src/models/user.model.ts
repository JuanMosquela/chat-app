import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      default: true,
    },
    picture: String,
    google: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
