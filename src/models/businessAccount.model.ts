import mongoose, { Schema, Document, Types } from "mongoose";

//
// INTERFACES
//
export interface ISocials {
  social: string;
  number?: string | null;
  business_email?: string | null;
  website?: string | null;
}

export interface IProduct {
  active: boolean;
  name: string;
  description: string;
  problem_solved?: string;
  pricing?: string | null;
}

export interface IPlan {
  plan_name: string;
  expiry_days: Date;
  date?: Date;
  status?: string;
  price?: string;
}

export interface IFAQ {
  sub_niche: string;
  faq: string[];
  isUsed?: boolean;
  rank: number;
  date_used?: Date | null | string;
}

export interface IEngagement {
  sub_niche: string;
  engagement: string[];
  isUsed?: boolean;
  rank: number;
  date_used?: Date | null | string;
}

export interface IMeme {
  name: string;
  info?: string | null;
  image_url?: string | null;
  isUsed?: boolean;
  date_used?: Date | null | string;
}

export interface IEducationalHook {
  educational_hook: string;
  isUsed?: boolean;
  date_used?: Date | null | string;
}

export interface IAccount {
  platform: string;
  id: string;
  name: string;
  image_url?: string | null;
  linked_at?: Date | null;
  status?: string;
}

export interface IBusinessAccount extends Document {
  owner_user: Types.ObjectId;
  business_name: string;
  business_email: string;
  vps: string;
  services?: string[];
  content_language?: string | null;
  niche?: string | null;
  industry?: string | null;
  target_market?: string[];
  socials: ISocials;
  content_calendar_url?: string;
  dashboard_url?: string;
  assets?: {
    logo?: string | null;
    accent_color?: string | null;
    primary_color?: string | null;
    font?: string | null;
  };
  brand_voice?: string | null;
  products?: IProduct[];
  faq?: IFAQ[];
  sub_niche?: string[];
  engagement?: IEngagement[];
  educational_hook?: IEducationalHook[];
  meme?: IMeme[];
  plan?: IPlan; // ⬅️ Added plan field
  templates?: String[]; // ⬅️ Array of Template references
  content_calendar_id?: Types.ObjectId;
  credits?: number;
  status?: string;
  accounts?: IAccount[];
}

//
// SCHEMAS
//
const AccountsSchema = new Schema<IAccount>({
  platform: {
    type: String,
    enum: [
      "faceboook",
      "x",
      "instagram",
      "linkedin",
      "tiktok",
      "threads",
      "youtube",
      "pinterest",
    ],
  },
  id: { type: String },
  name: { type: String },
  image_url: String,
  linked_at: Date,
  status: {
    type: String,
    enum: ["connected", "failed", "inactive"],
    default: "connected",
  },
});

const SocialsSchema = new Schema<ISocials>({
  social: { type: String },
  number: String,
  business_email: String,
  website: String,
});

const ProductSchema = new Schema<IProduct>({
  active: { type: Boolean, default: true },
  name: String,
  description: String,
  problem_solved: String,
  pricing: String,
});

const PlanSchema = new Schema<IPlan>({
  plan_name: { type: String },
  expiry_days: { type: Date },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "expired"], default: "active" },
  price: { type: String },
});

const FAQSchema = new Schema<IFAQ>({
  sub_niche: String,
  faq: [String],
  isUsed: { type: Boolean, default: false },
  rank: Number,
  date_used: String,
});

const EngagementSchema = new Schema<IEngagement>({
  sub_niche: String,
  engagement: [String],
  isUsed: { type: Boolean, default: false },
  rank: Number,
  date_used: String,
});

const MemeSchema = new Schema<IMeme>({
  name: String,
  info: String,
  image_url: String,
  isUsed: { type: Boolean, default: false },
  date_used: String,
});

const EducationalHookSchema = new Schema<IEducationalHook>({
  educational_hook: String,
  isUsed: { type: Boolean, default: false },
  date_used: String,
});

const BusinessAccountSchema = new Schema<IBusinessAccount>(
  {
    owner_user: { type: Schema.Types.ObjectId, ref: "User" },
    business_name: { type: String, required: true },
    business_email: { type: String },
    vps: String,
    services: [String],
    content_language: String,
    niche: String,
    industry: String,
    target_market: [String],
    socials: SocialsSchema,
    content_calendar_url: String,
    dashboard_url: String,
    assets: {
      logo: String,
      accent_color: String,
      primary_color: String,
      font: String,
    },
    brand_voice: [String],
    products: [ProductSchema],
    faq: [FAQSchema],
    sub_niche: [String],
    engagement: [EngagementSchema],
    educational_hook: [EducationalHookSchema],
    meme: [MemeSchema],
    plan: PlanSchema,
    templates: [{ type: String }],
    content_calendar_id: { type: String },
    credits: { type: Number, default: 0 },
    status: { type: String, default: "active" },
    accounts: [AccountsSchema],
  },
  { timestamps: true }
);

export const BusinessAccount =
  mongoose.models.BusinessAccount ||
  mongoose.model<IBusinessAccount>("BusinessAccount", BusinessAccountSchema);
