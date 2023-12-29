import { Document, ObjectId } from "mongoose";

export interface IBuyAndSell extends Document {
  product: ObjectId;
  date: string;
  hour: string;
  count: number;
  price: number;
  operation: "خرید" | "فروش" | "دپو" | "خرابی";
}
