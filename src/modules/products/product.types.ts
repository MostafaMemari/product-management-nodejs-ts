import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  title: string;
  dkp: number;
  dkpc: number;
  width: number;
  height: number;

  count?: number;
  img?: string;

  price?: number;
  url?: string;

  color?: ObjectId;
  category?: ObjectId;
  seller?: ObjectId;
}

export type ResponseProducts = {
  total: number;
  page: number;
  limit: number;
  products: IProduct[];
};
