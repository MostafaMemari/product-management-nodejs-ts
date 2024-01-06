import { Schema, model, Types } from "mongoose";
import { IProduct } from "./product.types";

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    dkp: { type: Number, required: true },
    dkpc: { type: Number, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    count: { type: Number, default: 0 },

    img: { type: String },

    price: { type: Number },
    url: { type: String },

    color: { type: Types.ObjectId, ref: "color" },
    category: { type: Types.ObjectId, ref: "category" },
    seller: { type: Types.ObjectId, ref: "seller" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const ProductModel = model("product", ProductSchema);
