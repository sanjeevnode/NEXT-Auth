import { connect } from "@/dbConfig/dbConfig.js";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Check if user already exists

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await sendEmail({ email, emailType: "verify", userId: newUser._id });

    return NextResponse.json({
      success: true,
      newUser,
      message: "User created successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
