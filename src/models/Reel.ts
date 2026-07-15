import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IReel extends Document {
  id: string;
  title: string;
  views: string;
  videoUrl: string;
  publicId: string;
  poster: string;
  bytes: number;
  format: string;
  originalBytes: number;
  wasCompressed: boolean;
  uploadedAt: Date;
}

const ReelSchema = new Schema<IReel>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  views: { type: String, required: true },
  videoUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  poster: { type: String, required: true },
  bytes: { type: Number },
  format: { type: String },
  originalBytes: { type: Number },
  wasCompressed: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now },
});

export const Reel = models.Reel || model<IReel>("Reel", ReelSchema);
