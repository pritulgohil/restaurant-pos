// /api/auth/logout.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const res = NextResponse.json({ message: "Logged out" });

  // Clear cookie
  res.cookies.set({
    name: "auth_token",
    value: "", // empty
    path: "/", // must match login path
    maxAge: 0, // expire immediately
    httpOnly: true, // same as login
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res;
}
