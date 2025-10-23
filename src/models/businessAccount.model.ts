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
  problemSolved?: string;
  pricing?: string | null;
}

export interface IPlan {
  plan_name: string;
  expiry_days: Date;
}

export interface IFAQ {
  sub_niche: string;
  faq: string[];
  isUsed?: boolean;
  date_used?: Date | null;
}

export interface IEngagement {
  sub_niche: string;
  engagement: string[];
  isUsed?: boolean;
  date_used?: Date | null;
}

export interface IMeme {
  name: string;
  info?: string | null;
  image_url?: string | null;
  isUsed?: boolean;
  date_used?: Date | null;
}

export interface IEducationalHook {
  educational_hook: string;
  isUsed?: boolean;
  date_used?: Date | null;
}

export interface ISubNiche {
  name: string;
  createdAt?: Date;
  owner_user: Types.ObjectId;
  business_account_id: Types.ObjectId;
}

export interface IContentCalendar {
  date: Date;
  position?: string;
  contentPillar: string;
  goalCTA?: string;
  mainTopic?: string;
  topic?: string;
  hook?: string;
  postCaption?: string;
  hashtags?: string[];
  approve_content?: boolean;
  approve_graphic?: boolean;
  content_url?: string;
  content_structure?: string;
  facebook_url?: string;
  instagram_url?: string;
  x_url?: string;
  linkedin_url?: string;
  threads_url?: string;
  content_used?: string;
  hook_used?: string;
  highlight_hooks?: string;
  template_used?: string;
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
  sub_niche?: ISubNiche[];
  engagement?: IEngagement[];
  educational_hook?: IEducationalHook[];
  meme?: IMeme[];
  content_calendar?: IContentCalendar[];
  plan?: IPlan; // ⬅️ Added plan field
  templates?: Types.ObjectId[]; // ⬅️ Array of Template references
}

//
// SCHEMAS
//
const SocialsSchema = new Schema<ISocials>({
  social: { type: String, required: true },
  number: String,
  business_email: String,
  website: String,
});

const ProductSchema = new Schema<IProduct>({
  active: { type: Boolean, default: true },
  name: String,
  description: String,
  problemSolved: String,
  pricing: String,
});

const PlanSchema = new Schema<IPlan>({
  plan_name: { type: String, required: true },
  expiry_days: { type: Date, required: true },
});

const FAQSchema = new Schema<IFAQ>({
  sub_niche: String,
  faq: [String],
  isUsed: { type: Boolean, default: false },
  date_used: Date,
});

const EngagementSchema = new Schema<IEngagement>({
  sub_niche: String,
  engagement: [String],
  isUsed: { type: Boolean, default: false },
  date_used: Date,
});

const MemeSchema = new Schema<IMeme>({
  name: String,
  info: String,
  image_url: String,
  isUsed: { type: Boolean, default: false },
  date_used: Date,
});

const EducationalHookSchema = new Schema<IEducationalHook>({
  educational_hook: String,
  isUsed: { type: Boolean, default: false },
  date_used: Date,
});

const SubNicheSchema = new Schema<ISubNiche>({
  name: String,
  createdAt: { type: Date, default: Date.now },
  owner_user: { type: Schema.Types.ObjectId, ref: "User" },
  business_account_id: { type: Schema.Types.ObjectId, ref: "BusinessAccount" },
});

const ContentCalendarSchema = new Schema<IContentCalendar>({
  date: Date,
  position: String,
  contentPillar: { type: String, required: true },
  goalCTA: String,
  mainTopic: String,
  topic: String,
  hook: String,
  postCaption: String,
  hashtags: [String],
  approve_content: { type: Boolean, default: false },
  approve_graphic: { type: Boolean, default: false },
  content_url: String,
  content_structure: String,
  facebook_url: String,
  instagram_url: String,
  x_url: String,
  linkedin_url: String,
  threads_url: String,
  content_used: String,
  hook_used: String,
  highlight_hooks: String,
  template_used: String,
});

const BusinessAccountSchema = new Schema<IBusinessAccount>({
  owner_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  business_name: { type: String, required: true },
  business_email: { type: String, required: true },
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
  brand_voice: String,
  products: [ProductSchema],
  faq: [FAQSchema],
  sub_niche: [SubNicheSchema],
  engagement: [EngagementSchema],
  educational_hook: [EducationalHookSchema],
  meme: [MemeSchema],
  content_calendar: [ContentCalendarSchema],
  plan: PlanSchema,
  templates: [{ type: Schema.Types.ObjectId, ref: "Template" }], // ✅ Array of Template references
});

export const BusinessAccount =
  mongoose.models.BusinessAccount ||
  mongoose.model<IBusinessAccount>("BusinessAccount", BusinessAccountSchema);
