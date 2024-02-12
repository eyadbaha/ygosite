import Deck from "@/app/models/Deck";
import dbConnect from "@/app/utils/dbConnect";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const result = await Deck.findById(id)
      .populate({
        path: "skill",
        model: "skills",
      })
      .lean();
    return new Response(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    return new Response("Not cool");
  }
};
export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const data = await req.json();
    const deck = data.deck;
    const result = await Deck.create(deck);

    return new Response("Cool");
  } catch (err) {
    console.log(err);
    return new Response("Not cool");
  }
};
