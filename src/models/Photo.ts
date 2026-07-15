import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IPhoto extends Document {
  id: string;
  url: string;
  category: string;
  likes: number;
  publicId: string;
  bytes: number;
  format: string;
  originalBytes: number;
  wasCompressed: boolean;
  isHomeShowcase: boolean;
  uploadedAt: Date;
}

const PhotoSchema = new Schema<IPhoto>({
  id: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  category: { type: String, required: true },
  likes: { type: Number, default: 0 },
  publicId: { type: String, required: true },
  bytes: { type: Number, required: true },
  format: { type: String, required: true },
  originalBytes: { type: Number, required: true },
  wasCompressed: { type: Boolean, default: false },
  isHomeShowcase: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now },
});

export const Photo = models.Photo || model<IPhoto>("Photo", PhotoSchema);
