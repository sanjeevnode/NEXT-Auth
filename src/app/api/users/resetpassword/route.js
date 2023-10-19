import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { token, password } = reqBody;

    const user = await User.findOne({ forgotPasswordToken: token });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
