import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IGalleryPhoto {
  id: string;
  url: string;
  category: string;
  likes: number;
}

export interface IGallery extends Document {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  date: string;
  location: string;
  photographer: string;
  coverUrl?: string;
  photos: IGalleryPhoto[];
  isPublic: boolean;
  password?: string;
  favorites: string[];
  isFeatured: boolean;
}

const GalleryPhotoSchema = new Schema<IGalleryPhoto>({
  id: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

const GallerySchema = new Schema<IGallery>({
  id: { type: String, required: true, unique: true },
  categoryId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  photographer: { type: String, default: "Om" },
  coverUrl: { type: String },
  photos: [GalleryPhotoSchema],
  isPublic: { type: Boolean, default: true },
  password: { type: String },
  favorites: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
});

export const Gallery = models.Gallery || model<IGallery>("Gallery", GallerySchema);
