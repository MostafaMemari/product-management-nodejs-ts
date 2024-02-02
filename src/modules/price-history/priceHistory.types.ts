import { Document, ObjectId } from "mongoose";

export interface IPriceHistory extends Document {
  sellerBuyBox?: object;
  mySeller?: object;
  product?: object;
  price?: number;
  status?: string;
  operation?: string;
  date?: string;
  hour?: string;
}
