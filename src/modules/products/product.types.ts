import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  title: string;
  dkp: number;
  dkpc: number;
  width: number;
  height: number;

  count?: number;
  img?: string;

  robot?: IRobot;

  price?: number;

  color?: ObjectId;
  category?: ObjectId;
  seller?: ObjectId;
}
export interface IRobot extends Document {
  reducePrice?: number;
  maxPrice?: number;
  minPrice?: number;
  isActive?: boolean;
  isBuyBox?: boolean;
  isCheckPrice?: boolean;
}

export type ResponseProducts = {
  total: number;
  page: number;
  limit: number;
  products: IProduct[];
};
