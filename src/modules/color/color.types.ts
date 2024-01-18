import { Document, ObjectId } from "mongoose";

export interface IColor extends Document {
  name: string;
}
