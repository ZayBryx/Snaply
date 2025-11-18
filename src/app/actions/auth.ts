// File location: /src/app/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/user.model";

interface LoginResult {
  success: boolean;
  message: string;
  role?: "admin" | "user";
}

export async function loginAction(email: string): Promise<LoginResult> {
  try {
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return {
        success: false,
        message: "No account found with this email address",
      };
    }

    if (user.role !== "admin") {
      return {
        success: false,
        message: "Access denied. Admin privileges required",
      };
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set(
      "user_session",
      JSON.stringify({
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      }),
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }
    );

    return {
      success: true,
      message: "Login successful",
      role: user.role,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An error occurred during login. Please try again",
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("user_session");
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("user_session");

    if (!session) return null;

    return JSON.parse(session.value);
  } catch {
    return null;
  }
}
