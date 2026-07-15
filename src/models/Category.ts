import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ICategory extends Document {
  id: string;
  name: string;
  coverUrl: string;
  shootCount: number;
  order: number;
}

const CategorySchema = new Schema<ICategory>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  coverUrl: { type: String, required: true },
  shootCount: { type: Number, default: 0 },
  order: { type: Number, required: true },
});

export const Category = models.Category || model<ICategory>("Category", CategorySchema);
