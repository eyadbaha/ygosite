import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GET = async (req: Request, res: NextApiResponse) => {
  cookies().delete("ACCESS_TOKEN");
  cookies().delete("REFRESH_TOKEN");
  return redirect("/");
};
