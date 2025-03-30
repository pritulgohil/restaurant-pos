import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"; // JWT library for token verification

export async function PATCH(req, { params }) {
  try {
    // Connect to the database
    await dbConnect();

    // Await params to extract the userId from the URL
    const { userId } = await params;

    // Get the request body (firstname and lastname)
    const { firstname, lastname } = await req.json();

    // Check if firstname and lastname are provided
    if (!firstname || !lastname) {
      return NextResponse.json(
        { error: "First name and Last name are required" },
        { status: 400 }
      );
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Extract the JWT token from the request headers
    const authHeader = req.headers.get("Authorization");

    // If no token is provided
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    // Extract the token from the header (Bearer token)
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret key (replace 'your-secret-key' with your actual secret)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the decoded userId does not match the requested userId, it's not authorized
    if (decoded.userId !== userId) {
      return NextResponse.json(
        { error: "You are not authorized to update this user's details" },
        { status: 403 }
      );
    }

    // Find the user by ObjectId and update firstname and lastname
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstname, lastname },
      { new: true, runValidators: true } // To return the updated document
    );

    // If no user is found
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors (such as invalid token, db issues, etc.)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
