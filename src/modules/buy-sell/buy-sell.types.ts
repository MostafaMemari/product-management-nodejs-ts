import { Document, ObjectId } from "mongoose";

export interface IBuyAndSell extends Document {
  product: string | ObjectId;
  date: string;
  hour?: string;
  count: number;
  price?: number;
  operation: "خرید" | "فروش" | "دپو" | "خرابی";
  status: "buy" | "sell";
}
