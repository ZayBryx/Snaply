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
      default: () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
    },
    coupon: { type: String },
    mop: { type: String, required: true },
    price: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
