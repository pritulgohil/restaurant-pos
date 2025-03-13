import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import mongoose from "mongoose";

export async function PATCH(req, { params }) {
  try {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
