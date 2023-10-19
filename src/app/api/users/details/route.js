import { connect } from "@/dbConfig/dbConfig";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const res = await getDataFromToken(request);

    const user = await User.findById(res.id, "username email");

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
