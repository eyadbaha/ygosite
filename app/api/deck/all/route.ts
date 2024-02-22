import Deck from "@/app/models/Deck";
import dbConnect from "@/app/utils/dbConnect";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();
    const result = await Deck.aggregate([
      {
        $lookup: {
          from: "dlmSkills", // Name of the skills collection
          localField: "skill",
          foreignField: "name",
          as: "skillData",
        },
      },
      {
        $unwind: {
          path: "$skillData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          // Extract fields from the skillData array
          skill: {
            name: "$skillData.name",
            desc: "$skillData.description",
          },
          type: 1,
          mainDeck: 1,
          extraDeck: 1,
          sideDeck: 1,
          name: 1,
          format: 1,
        },
      },
    ]);
    return new Response(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    return new Response("Not cool");
  }
};
