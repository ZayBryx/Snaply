"use server";

import { connectDB } from "@/lib/mongoose";
import { Template } from "@/models/template.model";
import { User } from "@/models/user.model";
import "@/models/businessAccount.model";

export async function getAllUsers(currentUserId?: string) {
  try {
    await connectDB();

    const users = await User.find({
      _id: { $ne: currentUserId },
    }).populate("business_accounts", "_id business_name");

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getUserStats() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: "admin" });
    const userCount = await User.countDocuments({ role: "user" });
    const usersWithBusiness = await User.countDocuments({
      business_accounts: { $exists: true, $ne: [] },
    });
    const templatesCount = await Template.countDocuments();

    return {
      totalUsers,
      adminCount,
      userCount,
      usersWithBusiness,
      templatesCount,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw new Error("Failed to fetch stats");
  }
}
