"use server";

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
// import UserModel from "@/app/models/User";
// import RefreshToken from "../models/RefreshToken";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
// const authenticateUser = async () => {
//   const Cookies = cookies();
//   const access_token = Cookies.get("ACCESS_TOKEN");
//   const refresh_token = Cookies.get("REFRESH_TOKEN");
//   if (access_token && refresh_token && ACCESS_TOKEN_SECRET && REFRESH_TOKEN_SECRET) {
//     try {
//       const decodedUser = jwt.verify(access_token.value, ACCESS_TOKEN_SECRET) as JwtPayload;
//       return decodedUser;
//     } catch (err) {
//       try {
//         const RefreshTokenExists = await RefreshToken.findOne({ token: refresh_token });
//         if (RefreshTokenExists) {
//           const refreshToken = jwt.verify(access_token.value, REFRESH_TOKEN_SECRET) as JwtPayload;
//           const user = await UserModel.findOne({ discordId: refreshToken.id });
//           if (user) {
//             const new_access_token = jwt.sign(
//               { id: user.id, avatar: user.avatar, name: user.name, roles: user.roles },
//               ACCESS_TOKEN_SECRET,
//               { expiresIn: "15s" }
//             );
//             cookies().set({
//               name: "ACCESS_TOKEN",
//               value: new_access_token,
//               httpOnly: true,
//               path: "/",
//             });
//             return { id: user.id, avatar: user.avatar, name: user.name, roles: user.roles };
//           } else {
//             throw "Failed to Fetch Refresh Token.";
//           }
//         }
//       } catch {
//         Cookies.delete("ACCESS_TOKEN");
//         Cookies.delete("REFRESH_TOKEN");
//         console.log(err);
//       }
//     }
//   }
// };
const authenticateUser = async () => {
  const Cookies = cookies();
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
  return null;
};
export default authenticateUser;
