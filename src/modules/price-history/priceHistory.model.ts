import { Schema, Types, model } from "mongoose";
import { IPriceHistory } from "./priceHistory.types";

const PriceHistorySchema = new Schema<IPriceHistory>(
  {
    sellerBuyBox: {
      sellerID: { type: Number, required: true },
      title: { type: String, required: true },
      shipmentTime: { type: String, required: true },
    },
    mySeller: {
      seller: { type: Types.ObjectId, ref: "seller", required: true },
      shipmentTime: { type: String, required: true },
    },
    product: {
      title: { type: String, required: true },
      dkp: { type: Number, required: true },
      dkpc: { type: Number, required: true },
      price: { type: Number, required: true },
    },
    price: { type: Number, required: true },
    status: { type: String, enum: ["موفق", "ناموفق"], required: true },
    operation: { type: String, required: true },
    date: { type: String },
    hour: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export const PriceHistoryModel = model("price_history", PriceHistorySchema);
