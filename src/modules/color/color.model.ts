import { Schema, model, Types } from "mongoose";
import { IColor } from "./color.types";

const ProductSchema = new Schema<IColor>(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export const ColorModel = model("color", ProductSchema);
