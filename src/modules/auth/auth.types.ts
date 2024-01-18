import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  role: string;
  password: string;
}
