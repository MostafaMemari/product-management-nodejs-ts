import { Schema, Types, model } from "mongoose";
import { IBuyAndSell } from "./buy-sell.types";

const BuyAndSellSchema = new Schema<IBuyAndSell>(
  {
    product: { type: Types.ObjectId, required: true, ref: "product" },
    date: { type: String, required: true },
    hour: { type: String, required: true },
    count: { type: Number, required: true },
    price: { type: Number },
    operation: { type: String, default: "فروش", enum: ["خرید", "فروش", "دپو", "خرابی"] },
    status: { type: String, default: "buy", enum: ["buy", "sell"] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const BuyAndSellModel = model("buyAndsell", BuyAndSellSchema);
