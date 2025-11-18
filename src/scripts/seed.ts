import "@/config/loadEnv"; // must be first
import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/user.model";
import { BusinessAccount } from "@/models/businessAccount.model";
import { Template } from "@/models/template.model";
import Affiliate from "@/models/affiliate.model";
import Coupon from "@/models/coupon.model";
import Payments from "@/models/payments.model";
import { business_accounts } from "./business_accounts";
import { affiliate } from "./affiliates";
import { coupons } from "./coupons";

async function seed() {
  await connectDB();
  console.log("🌱 Seeding Snaply Database...");

  // ──────────────── CLEAN PREVIOUS DATA ────────────────
  await Promise.all([
    User.deleteMany({}),
    BusinessAccount.deleteMany({}),
    Template.deleteMany({}),
    // Affiliate.deleteMany({}),
    // Coupon.deleteMany({}),
    Payments.deleteMany({}),
  ]);

  // ──────────────────────────────────────────────
  // Normalizes all possible date formats
  // ──────────────────────────────────────────────
  function normalizeDate(value: any): Date | null {
    if (!value) return null;
    if (typeof value !== "string") return new Date(value);

    const trimmed = value.trim();

    // Empty string
    if (trimmed === "") return null;

    // Literal template string (n8n fields)
    if (trimmed.startsWith("$(")) return null;

    // Convert DD/MM/YYYY → YYYY-MM-DD
    const ddmmyyyy = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (ddmmyyyy.test(trimmed)) {
      const [, dd, mm, yyyy] = trimmed.match(ddmmyyyy)!;
      return new Date(`${yyyy}-${mm}-${dd}`);
    }

    // Try native JS parsing
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) return parsed;

    return null;
  }

  const cleanedBusinessAccounts = business_accounts.map((acc) => {
    // Enforce defaults for top-level fields
    acc.business_name = acc.business_name
      ? String(acc.business_name).trim()
      : "";
    acc.business_email = acc.business_email
      ? String(acc.business_email).trim()
      : "";
    acc.vps = acc.vps ? String(acc.vps).trim() : "";
    acc.services = Array.isArray(acc.services) ? acc.services : [];
    acc.content_language = acc.content_language
      ? String(acc.content_language).trim()
      : "";
    acc.niche = acc.niche ? String(acc.niche).trim() : "";
    acc.industry = acc.industry ? String(acc.industry).trim() : "";
    acc.target_market = Array.isArray(acc.target_market)
      ? acc.target_market
      : [];
    acc.socials = acc.socials || {};
    acc.assets = acc.assets || {};
    acc.brand_voice = Array.isArray(acc.brand_voice) ? acc.brand_voice : [];
    acc.products = Array.isArray(acc.products) ? acc.products : [];
    acc.faq = Array.isArray(acc.faq) ? acc.faq : [];
    acc.sub_niche = Array.isArray(acc.sub_niche) ? acc.sub_niche : [];
    acc.engagement = Array.isArray(acc.engagement) ? acc.engagement : [];
    acc.educational_hook = Array.isArray(acc.educational_hook)
      ? acc.educational_hook
      : [];
    acc.meme = Array.isArray(acc.meme) ? acc.meme : [];
    acc.plan = acc.plan || {
      plan_name: "default",
      expiry_days: new Date(),
      status: "active",
    };
    acc.templates = Array.isArray(acc.templates) ? acc.templates : [];
    acc.content_calendar_id = acc.content_calendar_id || "";
    acc.credits = acc.credits || 0;
    acc.status = acc.status || "active";
    acc.accounts = Array.isArray(acc.accounts) ? acc.accounts : [];
    acc.date_used = normalizeDate(acc.date_used);

    // ---------------- ENGAGEMENT ----------------
    acc.engagement = acc.engagement.map((item: any) => {
      return {
        "sub-niche": item["sub-niche"] ? String(item["sub-niche"]).trim() : "",
        engagement: Array.isArray(item.engagement)
          ? item.engagement.map((e: string) => e.trim())
          : [],
        faq: Array.isArray(item.faq)
          ? item.faq.map((f: string) => f.trim())
          : [],
        rank: item.rank || 0,
        isUsed: Boolean(item.isUsed),
        date_used: normalizeDate(item.date_used),
        date: normalizeDate(item.date),
        date_added: normalizeDate(item.date_added),
        date_updated: normalizeDate(item.date_updated),
        created_at: normalizeDate(item.created_at),
        updated_at: normalizeDate(item.updated_at),
      };
    });

    // ---------------- FAQ ----------------
    acc.faq = acc.faq.map((item: any) => {
      return {
        "sub-niche": item["sub-niche"] ? String(item["sub-niche"]).trim() : "",
        faq: Array.isArray(item.faq)
          ? item.faq.map((f: string) => f.trim())
          : [],
        engagement: Array.isArray(item.engagement)
          ? item.engagement.map((e: string) => e.trim())
          : [],
        rank: item.rank || 0,
        isUsed: Boolean(item.isUsed),
        date_used: normalizeDate(item.date_used),
        date: normalizeDate(item.date),
        date_added: normalizeDate(item.date_added),
        date_updated: normalizeDate(item.date_updated),
        created_at: normalizeDate(item.created_at),
        updated_at: normalizeDate(item.updated_at),
      };
    });

    // ---------------- EDUCATIONAL HOOKS ----------------
    acc.educational_hooks = acc.educational_hooks.map((item: any) => {
      return {
        educational_hook: item.educational_hook
          ? String(item.educational_hook).trim()
          : "",
        isUsed: Boolean(item.isUsed),
        date_used: normalizeDate(item.date_used),
      };
    });

    return acc;
  });

  console.log("Cleaned Business Accounts:", cleanedBusinessAccounts[0]);
  // await BusinessAccount.insertMany(cleanedBusinessAccounts);

  console.log("✅ Seed completed successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
