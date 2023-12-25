import { Schema, model, Types } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  dkp: { type: Number, required: true },
  dkpc: { type: Number, required: true },
  price: { type: Number, required: true },
  count: { type: Number, default: 0 },
  color: { type: Types.ObjectId, ref: "color" },
  category: { type: Types.ObjectId, ref: "category" },
  seller: { type: Types.ObjectId, ref: "seller" },
});

export const ProductModel = model("product", ProductSchema);
