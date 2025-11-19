import mongoose, { Schema, Document, Types } from "mongoose";

interface Announcement {
  html: string;
  read: boolean;
}

interface Mop {
  name?: string;
  number?: string;
  type?: string;
}

export interface IAffiliate extends Document {
  _id: Types.ObjectId;
  email: string;
  first_name: string;
  last_name: string;
  name: string;
  access_code?: string;
  announcement?: Announcement[];
  commission?: string;
  isVIP?: boolean;
  mop?: Mop;
  payout?: any[];
  registered?: boolean;
}

const AffiliateSchema: Schema = new Schema<IAffiliate>(
  {
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    name: { type: String, required: true },
    access_code: { type: String },
    announcement: [
      {
        html: { type: String },
        read: { type: Boolean },
      },
    ],
    isVIP: { type: Boolean },
    mop: {
      name: { type: String },
      number: { type: String },
      type: { type: String },
    },
    payout: { type: [Schema.Types.Mixed] },
    registered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Affiliate ||
  mongoose.model<IAffiliate>("Affiliate", AffiliateSchema);
