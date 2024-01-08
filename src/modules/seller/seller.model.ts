import { Schema, model } from "mongoose";
import { ISeller } from "./seller.types";

const SellerSchema = new Schema<ISeller>(
  {
    sellerID: { type: Number, required: true },
    sellerTitle: { type: String, required: true },
    token: { type: String, required: true },
    isRobot: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

export const SellerModel = model("seller", SellerSchema);
