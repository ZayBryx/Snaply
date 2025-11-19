import "@/config/loadEnv"; // must be first
import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/user.model";
import { BusinessAccount } from "@/models/businessAccount.model";
import { Template } from "@/models/template.model";
import Affiliate from "@/models/affiliate.model";
import Coupon from "@/models/coupon.model";
import Payments from "@/models/payments.model";
import { business_accounts } from "./exported-data/business_accounts";
import { affiliate } from "./exported-data/affiliates";
import { coupons } from "./exported-data/coupons";
import { users } from "./exported-data/users";
import { templates } from "./exported-data/templates";
import { payments } from "./exported-data/payments";
import ContentCalendar from "@/models/contentCalendar.model";

async function seed() {
  await connectDB();
  console.log("🌱 Seeding Snaply Database...");

  // ──────────────── CLEAN PREVIOUS DATA ────────────────
  await Promise.all([
    User.deleteMany({}),
    BusinessAccount.deleteMany({}),
    Template.deleteMany({}),
    ContentCalendar.deleteMany({}),
    // Affiliate.deleteMany({}),
    // Coupon.deleteMany({}),
    Payments.deleteMany({}),
  ]);

  await Template.insertMany(templates);
  await User.insertMany(users);
  await BusinessAccount.insertMany(business_accounts);
  await Payments.insertMany(payments);

  console.log("✅ Seed completed successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
