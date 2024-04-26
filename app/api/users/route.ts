import User from "@/app/models/User";
import dbConnect from "@/app/utils/dbConnect";

export const GET = async (req: Request) => {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const query: any = {};
  const id = searchParams.get("id");
  const result = await User.findOne({ discordId: id }, { _id: 0 }).lean();
  if (result) return new Response(JSON.stringify({ id: result.discordId, name: result.name }));
  return new Response("{}");
};
