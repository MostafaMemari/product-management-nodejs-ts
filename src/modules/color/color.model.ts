import { Schema, model, Types } from "mongoose";
import { IColor } from "./color.types";

const ColorSchema = new Schema<IColor>(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export const ColorModel = model("color", ColorSchema);
