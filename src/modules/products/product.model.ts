import { Schema, model, Types } from "mongoose";
import { IProduct, IRobot } from "./product.types";

const robotSchema = new Schema<IRobot>(
  {
    reducePrice: { type: Number, default: 0 },
    maxPrice: { type: Number, default: 0 },
    minPrice: { type: Number, default: 0 },
    isActive: { type: Boolean, default: false },
    isBuyBox: { type: Boolean, default: false },
    isCheckPrice: { type: Boolean, default: false },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    dkp: { type: Number, required: true },
    dkpc: { type: Number, required: true, unique: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    count: { type: Number, default: 0 },

    img: { type: String },
    price: { type: Number },
    robot: { type: robotSchema, default: { robotSchema } },

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
