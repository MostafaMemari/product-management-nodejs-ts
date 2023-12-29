import { Schema, model } from "mongoose";
import { IBuyAndSell } from "./buy-sell.types";

const BuyAndSellSchema = new Schema<IBuyAndSell>(
  {
    product: { type: String, required: true },
    date: { type: String, required: true },
    hour: { type: String, required: true },
    count: { type: Number, required: true },
    price: { type: Number, required: true },
    operation: { type: String, default: "فروش", enum: ["خرید", "فروش", "دپو", "خرابی"] },
  },
  {
    versionKey: false,
  }
);

export const BuyAndSellModel = model("buy", BuyAndSellSchema);
