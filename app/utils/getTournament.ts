import Tournaments from "../models/Tournaments";
import { unstable_cache } from "next/cache";
import dbConnect from "../utils/dbConnect";
import mongoose from "mongoose";

export const getTournament = unstable_cache(
  async (id: number) => {
    try {
      await dbConnect();
      const tournamentRequest = await Tournaments.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $unwind: "$brackets.players",
        },
        {
          $lookup: {
            from: "players",
            localField: "brackets.players.id",
            foreignField: "id",
            as: "playerDetails",
          },
        },
        {
          $unwind: "$playerDetails",
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$title" }, // Preserve the title using $first
            players: {
              $push: {
                $mergeObjects: [
                  "$brackets.players",
                  {
                    id: "$playerDetails.id",
                    type: "$playerDetails.type",
                    discordID: "$playerDetails.discordID",
                    name: "$playerDetails.name",
                    // Include other fields from playersDetails if needed
                  },
                ],
              },
            },
            // Include other fields you want to keep at the top level
          },
        },
      ]);
      return tournamentRequest;
    } catch (err) {
      console.log(err);
    }
  },
  ["tournament"]
);
