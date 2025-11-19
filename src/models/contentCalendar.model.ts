import mongoose, { Schema, Document } from "mongoose";

export interface IComment {
  user_id: string;
  message: string;
  timestamp?: Date;
}

export interface IContentCalendar extends Document {
  owned_by: string;
  date: string;
  position?: string;
  content_pillar: string;
  goal_cta?: string;
  mainTopic?: string;
  topic?: string;
  hook?: string;
  caption?: string;
  hashtags?: string[];
  approve_content?: boolean;
  approve_graphic?: boolean;
  graphic_url?: string[];
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
  scheduledAt?: Date;
  postedAt?: Date;
  credits?: number;
  comments?: IComment[];

  platformCaptions?: {
    facebook?: string;
    instagram?: string;
    x?: string;
    linkedin?: string;
    tiktok?: string;
    threads?: string;
    youtube?: string;
    pinterest?: string;
  };
}

const CommentSchema = new Schema<IComment>({
  user_id: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const ContentCalendarSchema = new Schema<IContentCalendar>(
  {
    owned_by: String,
    date: { type: String, required: true, unique: true },
    position: String,
    content_pillar: { type: String, required: true },
    goal_cta: String,
    mainTopic: String,
    topic: String,
    hook: String,
    caption: String,
    hashtags: [String],
    approve_content: { type: Boolean, default: false },
    approve_graphic: { type: Boolean, default: false },
    graphic_url: [String],
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
    scheduledAt: Date,
    postedAt: Date,
    credits: { type: Number, default: 0 },
    comments: [CommentSchema],
    platformCaptions: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model<IContentCalendar>(
  "ContentCalendar",
  ContentCalendarSchema
);
