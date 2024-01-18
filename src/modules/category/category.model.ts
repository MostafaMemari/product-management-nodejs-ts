import { Schema, model } from "mongoose";
import { ICategory } from "./category.types";

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export const CategoryModel = model("category", CategorySchema);
