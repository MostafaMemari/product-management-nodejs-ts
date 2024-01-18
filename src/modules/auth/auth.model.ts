import { Schema, model } from "mongoose";
import { IUser } from "./auth.types";

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "USER" },
    password: { type: String },
  },
  {
    versionKey: false,
  }
);

export const UserModel = model("user", UserSchema);
