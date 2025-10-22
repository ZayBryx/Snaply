import "@/config/loadEnv"; // ✅ must be first

import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/user.model";
import { BusinessAccount } from "@/models/businessAccount.model";
import { Template } from "@/models/template.model";

async function seed() {
  await connectDB();
  console.log("🌱 Seeding Snaply Database...");

  // Clean previous data (optional)
  await Promise.all([
    User.deleteMany({}),
    BusinessAccount.deleteMany({}),
    Template.deleteMany({}),
  ]);

  // ──────────────── USERS ────────────────
  const adminUser = await User.create({
    email: "admin@snaply.io",
    name: "Snaply Admin",
    plan: "Enterprise",
    country: "United States",
    timezone: "America/New_York",
    role: "admin",
    business_accounts: [],
  });

  const userOne = await User.create({
    email: "isabella@snaply.io",
    name: "Isabella Reyes",
    plan: "Pro",
    country: "Philippines",
    timezone: "Asia/Manila",
    role: "user",
    business_accounts: [],
  });

  const userTwo = await User.create({
    email: "jordan@snaply.io",
    name: "Jordan Carter",
    plan: "Starter",
    country: "Singapore",
    timezone: "Asia/Singapore",
    role: "user",
    business_accounts: [],
  });

  // ──────────────── BUSINESS ACCOUNTS ────────────────

  // User One → 1 Business
  const business1 = await BusinessAccount.create({
    owner_user: userOne._id,
    business_name: "Reyes Media Group",
    business_email: "contact@reyesmedia.com",
    vps: "vps123.snaply.cloud",
    services: ["Content Marketing", "Brand Strategy"],
    content_language: "English",
    niche: "Coaching",
    industry: "Media",
    target_market: ["Female Entrepreneurs", "Consultants"],
    socials: {
      social: "instagram",
      number: "09171234567",
      business_email: "social@reyesmedia.com",
      website: "https://reyesmedia.com",
    },
    content_calendar_url: "https://snaply.io/calendar/reyes",
    dashboard_url: "https://snaply.io/dashboard/reyes",
    assets: {
      logo: "https://cdn.snaply.io/logos/reyes.png",
      accent_color: "#FF4081",
      primary_color: "#222222",
      font: "Inter",
    },
    brand_voice: "Empowering, Elegant, Confident",
    products: [
      {
        active: true,
        name: "Visibility Accelerator",
        description: "A 6-week program to grow online visibility.",
        problemSolved: "Low engagement and inconsistent brand presence.",
        pricing: "$997",
        templates: ["template-1", "template-2"],
      },
    ],
  });

  userOne.business_accounts.push(business1._id);
  await userOne.save();

  // User Two → 2 Businesses
  const business2a = await BusinessAccount.create({
    owner_user: userTwo._id,
    business_name: "Carter Digital Studio",
    business_email: "hello@carterdigital.io",
    vps: "vps456.snaply.cloud",
    services: ["Web Design", "Automation"],
    content_language: "English",
    niche: "Tech Startups",
    industry: "Creative Agency",
    target_market: ["Founders", "Startups"],
    socials: {
      social: "linkedin",
      number: "09998887777",
      business_email: "team@carterdigital.io",
      website: "https://carterdigital.io",
    },
    content_calendar_url: "https://snaply.io/calendar/carter",
    dashboard_url: "https://snaply.io/dashboard/carter",
    assets: {
      logo: "https://cdn.snaply.io/logos/carter.png",
      accent_color: "#00BFA6",
      primary_color: "#111111",
      font: "Poppins",
    },
    brand_voice: "Modern, Direct, Tech-savvy",
    products: [
      {
        active: true,
        name: "Automation Blueprint",
        description: "A 4-week done-for-you automation setup.",
        problemSolved: "Manual tasks slowing down your operations.",
        pricing: "$1499",
        templates: ["template-automation", "template-systems"],
      },
    ],
  });

  const business2b = await BusinessAccount.create({
    owner_user: userTwo._id,
    business_name: "Momentum Marketing Co.",
    business_email: "info@momentummarketing.co",
    vps: "vps789.snaply.cloud",
    services: ["Ads Management", "Social Media Strategy"],
    content_language: "English",
    niche: "E-commerce",
    industry: "Advertising",
    target_market: ["Ecom Brands", "Online Retailers"],
    socials: {
      social: "facebook",
      number: "09223334444",
      business_email: "ads@momentummarketing.co",
      website: "https://momentummarketing.co",
    },
    content_calendar_url: "https://snaply.io/calendar/momentum",
    dashboard_url: "https://snaply.io/dashboard/momentum",
    assets: {
      logo: "https://cdn.snaply.io/logos/momentum.png",
      accent_color: "#FF9800",
      primary_color: "#000000",
      font: "Roboto",
    },
    brand_voice: "Energetic, Bold, Conversion-focused",
    products: [
      {
        active: true,
        name: "Ecom Growth System",
        description: "An ad strategy system for scaling brands.",
        problemSolved: "Poor ad ROI and inconsistent campaign performance.",
        pricing: "$2997",
        templates: ["template-growth", "template-scale"],
      },
    ],
  });

  userTwo.business_accounts.push(business2a._id, business2b._id);
  await userTwo.save();

  // ──────────────── TEMPLATES ────────────────
  await Template.insertMany([
    {
      content_pillar: "Motivational",
      templates: ["Keep pushing!", "Dream big."],
      type: "solid",
      isPremium: false,
      hasFooter: true,
    },
    {
      content_pillar: "Educational",
      templates: ["5 Ways to Build Authority", "The Psychology of Engagement"],
      type: "overlay",
      isPremium: true,
      hasFooter: false,
    },
    {
      content_pillar: "Promotional",
      templates: ["Flash Sale!", "Limited Offer — Don’t Miss Out!"],
      type: "glass",
      isPremium: false,
      hasFooter: true,
    },
  ]);

  console.log("✅ Seed completed successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
