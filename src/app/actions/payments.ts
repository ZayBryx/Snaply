"use server";

import { connectDB } from "@/lib/mongoose";
import Affiliate from "@/models/affiliate.model";
import Coupon from "@/models/coupon.model";
import Payments from "@/models/payments.model";

export async function getAllPayments() {
  await connectDB();

  try {
    const payments = await Payments.find().lean();
    return JSON.parse(JSON.stringify(payments));
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
}
