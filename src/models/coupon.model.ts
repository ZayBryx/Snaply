import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICoupon extends Document {
  commission: string;
  coupon_code: string;
  discount: string;
  is_used: boolean;
  isValid: boolean;
  owned_by: string | null;
  type: string;
  valid_until: string;
}

const CouponSchema: Schema = new Schema<ICoupon>(
  {
    commission: { type: String, required: true },
    coupon_code: { type: String, required: true },
    discount: { type: String, required: true },
    is_used: { type: Boolean, required: true },
    isValid: { type: Boolean, required: true },
    owned_by: { type: String, default: null },
    type: { type: String, required: true },
    valid_until: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Coupon ||
  mongoose.model<ICoupon>("Coupon", CouponSchema);
