"use server";

import { connectDB } from "@/lib/mongoose";
import Affiliate, { IAffiliate } from "@/models/affiliate.model";
import Coupon, { ICoupon } from "@/models/coupon.model";
import { Types } from "mongoose";

export async function getAllAffiliate() {
  await connectDB();

  try {
    const affiliates = await Affiliate.find().lean<IAffiliate[]>();
    const coupons = await Coupon.find().lean<ICoupon[]>();

    const couponMap: Record<string, string[]> = {};

    for (const c of coupons) {
      if (!c.owned_by) continue;

      if (!couponMap[c.owned_by]) {
        couponMap[c.owned_by] = [];
      }

      couponMap[c.owned_by].push(c.coupon_code);
    }

    const result = affiliates.map((aff) => {
      const id = (aff._id as Types.ObjectId).toString();

      return {
        ...aff,
        coupon_codes: couponMap[id] || [],
      };
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error fetching affiliates and coupons:", error);
    return [];
  }
}
