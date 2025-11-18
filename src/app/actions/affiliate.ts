"use server";

import { connectDB } from "@/lib/mongoose";
import Affiliate from "@/models/affiliate.model";
import Coupon from "@/models/coupon.model";

export async function getAllAffiliate() {
  // 1️⃣ Connect to MongoDB
  await connectDB();

  try {
    const affiliates = await Affiliate.find().lean();

    const coupons = await Coupon.find().lean();

    const combined = affiliates.map((affiliate) => {
      const affiliateCoupons = coupons.filter(
        (coupon) => coupon.commission === affiliate.commission
      );

      return {
        ...affiliate,
        coupons: affiliateCoupons,
      };
    });

    return combined;
  } catch (error) {
    console.error("Error fetching affiliates and coupons:", error);
    return [];
  }
}
