import RefreshTokenModel from "@/app/models/RefreshToken";
import UserModel from "@/app/models/User";
import axios from "axios";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const clientId = process.env.DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";

const FetchDiscordUserInfo = async (code: string) => {
  try {
    const response = await axios.post(
      "https://discord.com/api/v10/oauth2/token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://ygosite.vercel.app/api/auth/discord/redirect",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const accessToken = response.data.access_token;
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = userResponse.data;
    // const userInDatabase = await UserModel.findOne({ discordId: user.id });
    // if (!userInDatabase) {
    //   UserModel.create({ discordId: user.id, name: user["global_name"], avatar: user.avatar || "", roles: [] });
    // } else if (userInDatabase.roles) {
    //   user.roles = userInDatabase.roles;
    // }
    const access = jwt.sign({ id: user.id, avatar: user.avatar, name: user["global_name"], roles: user.roles || [] }, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
    const refresh = jwt.sign({ id: user.id, avatar: user.avatar, name: user["global_name"], roles: user.roles || [] }, REFRESH_TOKEN_SECRET);
    // RefreshTokenModel.create({ discordId: user.id, token: refresh });
    return { access, refresh };
  } catch (error) {
    console.error("Error exchanging code for token:", error);
  }
};
export const GET = async (req: Request, res: NextApiResponse) => {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const tokens = await FetchDiscordUserInfo(code || "");
  tokens &&
    cookies().set({
      name: "ACCESS_TOKEN",
      value: tokens.access,
      httpOnly: true,
      path: "/",
    });
  tokens &&
    cookies().set({
      name: "REFRESH_TOKEN",
      value: tokens.refresh,
      httpOnly: true,
      path: "/",
    });
  return redirect("/");
};
