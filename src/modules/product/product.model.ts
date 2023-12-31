import { Schema, model, Types } from "mongoose";
import { IProduct } from "./product.types";

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    dkp: { type: Number, required: true },
    dkpc: { type: Number, required: true },
    price: { type: Number },
    count: { type: Number, default: 0 },
    color: { type: Types.ObjectId, ref: "color" },
    category: { type: Types.ObjectId, ref: "category" },
    seller: { type: Types.ObjectId, ref: "seller" },
  },
  {
    versionKey: false,
  }
);

export const ProductModel = model("product", ProductSchema);
