import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  title: string;
  dkp: number;
  dkpc: number;
  price: number;
  count?: number;
  color?: ObjectId;
  category?: ObjectId;
  img?: string;
  url?: string;
  height?: number;
  width?: number;
  seller?: ObjectId;
}

export type ResponseProducts = {
  total: number;
  page: number;
  limit: number;
  products: IProduct[];
};
