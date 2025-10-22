"use server";

import { connectDB } from "@/lib/mongoose";
import { Template } from "@/models/template.model";
import { BusinessAccount } from "@/models/businessAccount.model";

export async function getAllTemplates() {
  try {
    await connectDB();

    const templates = await Template.find({}).lean();
    return JSON.parse(JSON.stringify(templates));
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw new Error("Failed to fetch templates");
  }
}
