import { Document, ObjectId } from "mongoose";

export interface ICategory extends Document {
  name: string;
}
