import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  title: string;
  dkp: number;
  dkpc: number;
  price: number;
  count?: number;
  color?: ObjectId;
  category?: ObjectId;
  seller?: ObjectId;
}
