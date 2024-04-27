import Card from "@/app/models/Card";
import dbConnect from "@/app/utils/dbConnect";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  try {
    await dbConnect();

    const name = searchParams.get("name");
    const id = searchParams.get("id");
    const limit = Math.min(Math.max(Number(searchParams.get("limit")), 0), 20);
    const query: any = {};
    if (name) query.name = { $regex: new RegExp(name, "i") };
    if (id) query.id = id;
    const result = await Card.find(query, { _id: 0, card_sets: 0, card_images: 0, card_prices: 0 }).limit(limit).lean();
    return new Response(JSON.stringify(result));
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify(err));
  }
};
