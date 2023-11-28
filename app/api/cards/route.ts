import Ocg from "@/app/models/Ocg";
import dbConnect from "@/app/utils/dbConnect";

export const GET = async (req: Request) => {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const query: any = {};
  const name = searchParams.get("name");
  const limit = Math.min(Math.max(Number(searchParams.get("limit")), 0), 20);
  if (name) query.name = { $regex: new RegExp(name, "i") };
  const result = await Ocg.find(query, { _id: 0, card_sets: 0, card_images: 0, card_prices: 0 }).limit(limit).lean();
  return new Response(JSON.stringify(result));
};
