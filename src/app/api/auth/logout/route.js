// /api/auth/logout.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const res = NextResponse.json({ message: "Logged out" });

  res.cookies.set({
    name: "auth_token",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res;
}
