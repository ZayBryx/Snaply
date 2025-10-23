import mongoose, { Schema, Document, Types } from "mongoose";

export type UserRole = "admin" | "user";

export interface IUser extends Document {
  email: string;
  name: string;
  country: string;
  timezone: string;
  role: UserRole;
  business_accounts: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  country: { type: String },
  timezone: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  business_accounts: [{ type: Schema.Types.ObjectId, ref: "BusinessAccount" }],
});

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
