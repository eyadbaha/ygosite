import dbConnect from "@/app/utils/dbConnect";
import Tournaments from "@/app/models/Tournaments";
import mongoose from "mongoose";
function isValidObjectId(str: string) {
  // Check if the string is a 24-character hexadecimal string
  return /^[0-9a-fA-F]{24}$/.test(str);
}
export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const stateQuery = state ? parseInt(state) : null;
  const id = searchParams.get("id");
  const query: any = {};
  id && (query._id = id);
  state && (query.state = stateQuery);
  // const currentDate = new Date();
  //const result = await Tournaments.find({ date: { $gt: currentDate } }).lean()
  if (!isValidObjectId(query._id) && query._id) return new Response(JSON.stringify(null));
  const result = await Tournaments.find(query, { brackets: 0 }).lean();
  if (!result.length) return new Response(JSON.stringify(null));

  if (id) {
    const playersRequest = await Tournaments.aggregate([
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
          brackets: {
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
    const players: any = playersRequest[0]?.brackets;
    const response: any = { ...result[0], players };
    return new Response(JSON.stringify(response));
  }

  return new Response(JSON.stringify(result));
}
export const PATCH = async (req: Request) => {
  try {
    await dbConnect();
    const data = await req.json();
    const tournament = await Tournaments.findById(data.id);
    if (tournament?.brackets?.players) {
      tournament.brackets.players = tournament.brackets.players.map((player: any, index: number) => {
        if (data.info[index]) {
          if (data.info[index].deck) data.info[index].deck = new mongoose.Types.ObjectId(data.info[index].deck);
          return { ...player, ...data.info[index] };
        }
        return player;
      });
    }
    await tournament?.save();
    return new Response("Cool");
  } catch (err) {
    console.log(err);
    return new Response("Not cool");
  }
};
