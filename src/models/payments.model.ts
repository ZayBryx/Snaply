import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPayment extends Document {
  coupon: string;
  date: string;
  email: string;
  mop: string;
  name: string;
  plan: string;
  price: string;
  receipt: string;
  reference_number: string;
  status: string;
}

const PaymentSchema: Schema = new Schema<IPayment>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    reference_number: { type: String, required: true },
    receipt: { type: String, required: true },
    plan: { type: String, required: true },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString(),
    },
    coupon: { type: String },
    mop: { type: String, required: true },
    price: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "appproved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
