import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default async function getDataFromToken(req) {
  try {
    const token = req.cookies.get("token").value || "";

    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECERET);

    return decoded;
  } catch (error) {
    throw new Error(error.message);
  }
}
