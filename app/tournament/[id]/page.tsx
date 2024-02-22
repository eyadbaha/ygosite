import Tournaments from "@/app/models/Tournaments";
import { Deck as DeckComponent } from "../../components/Deck";
import mongoose from "mongoose";
import { getDeck } from "@/app/utils/getDeck";
function formatPlacementNumber(placement: number) {
  if (placement === 1) {
    return "1st Place";
  } else if (placement === 2) {
    return "2nd Place";
  } else if (placement > 2) {
    // Calculate the nearest power of 2 greater than or equal to placement
    const nearestPowerOf2 = Math.pow(2, Math.ceil(Math.log2(placement)));

    return "Top " + nearestPowerOf2;
  } else {
    return "Invalid Placement"; // Handle other cases if needed
  }
}

export default async ({ params }) => {
  const id = params.id;
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
  const tournament = tournamentRequest[0];
  const players: any[] = [...tournament?.players];
  for (let i = 0; i < players.length; i++) {
    if (players[i].deck) {
      const deck = await getDeck(players[i].deck.toString());
      players[i] = { name: players[i].name, place: players[i].place, deck };
    }
  }
  return (
    <>
      <p>{tournament.title}</p>
      {players?.map((player: any) => {
        return (
          <>
            {player.deck && (
              <>
                <p className="text-white text-responsive-1 font-KafuTechnoStd">
                  {formatPlacementNumber(player.place)}: {player.name}
                </p>
                <br />
                <DeckComponent {...player.deck} format="SPEED" />
              </>
            )}
          </>
        );
      })}
    </>
  );
};
