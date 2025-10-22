import mongoose from "mongoose";

export default function sanitize(value: any): any {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map(sanitize);
  if (value instanceof mongoose.Types.ObjectId) return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object") {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(value)) {
      // skip mongoose internal __v if desired later (we also exclude below)
      out[k] = sanitize(v);
    }
    return out;
  }
  return value;
}
