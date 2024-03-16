"use server";
import { NextRequest, NextResponse } from "next/server";
import authenticateUser from "./app/utils/authenticateUser";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
// import UserModel from "@/app/models/User";
// import RefreshToken from "../models/RefreshToken";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export default async function middleware(req: NextRequest, res: NextResponse) {
  const Cookies = req.cookies;
  const access_token = Cookies.get("ACCESS_TOKEN");
  const refresh_token = Cookies.get("REFRESH_TOKEN");
  if (access_token && refresh_token && ACCESS_TOKEN_SECRET && REFRESH_TOKEN_SECRET) {
    try {
      const decodedUser = jwt.verify(access_token.value, ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch {
      Cookies.delete("ACCESS_TOKEN");
      Cookies.delete("REFRESH_TOKEN");
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/",
};
