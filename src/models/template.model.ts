import mongoose, { Schema, Document } from "mongoose";

export interface ITemplate extends Document {
  content_pillar: string;
  templates: string[];
  html?: string | null;
  url?: string | null;
  type: "solid" | "overlay" | "glass";
  premum: boolean;
  footer: boolean;
}

const TemplateSchema = new Schema<ITemplate>({
  content_pillar: { type: String, required: true },
  templates: [{ type: String, required: true }],
  html: { type: String, default: null },
  url: { type: String, default: null },
  type: { type: String, enum: ["solid", "overlay", "glass"], required: true },
  premum: { type: Boolean, default: false },
  footer: { type: Boolean, default: false },
});

export const Template =
  mongoose.models.Template ||
  mongoose.model<ITemplate>("Template", TemplateSchema);
