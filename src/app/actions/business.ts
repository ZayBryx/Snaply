"use server";

import { connectDB } from "@/lib/mongoose";
import { Template } from "@/models/template.model";
import { BusinessAccount } from "@/models/businessAccount.model";

export async function getAllBusinesses() {
  try {
    await connectDB();

    const businesses = await BusinessAccount.find(
      {},
      {
        _id: 1,
        business_name: 1,
        business_email: 1,
        vps: 1,
        content_language: 1,
        niche: 1,
        industry: 1,
        content_calendar_url: 1,
        dashboard_url: 1,
        logo: 1,
        accent_color: 1,
        primary_color: 1,
        font: 1,
        brand_voice: 1,
      }
    ).lean();

    return JSON.parse(JSON.stringify(businesses));
  } catch (error) {
    console.error("Error fetching businesses:", error);
    throw new Error("Failed to fetch businesses");
  }
}
