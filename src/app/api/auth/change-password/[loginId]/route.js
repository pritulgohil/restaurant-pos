import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import mongoose from "mongoose";
import { verifyAuth } from "@/lib/verifyAuth";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { loginId } = await params;

    if (!loginId || !mongoose.Types.ObjectId.isValid(loginId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    let decoded;

    try {
      decoded = verifyAuth(req);
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if (!decoded.email) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const tokenUser = await User.findOne({ email: decoded.email });
    if (!tokenUser) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (tokenUser._id.toString() !== loginId.toString()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { currentPassword, newPassword, confirmNewPassword } =
      await req.json();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json(
        { error: "New passwords do not match" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(currentPassword, tokenUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    tokenUser.password = await bcrypt.hash(newPassword, 10);
    await tokenUser.save();

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
