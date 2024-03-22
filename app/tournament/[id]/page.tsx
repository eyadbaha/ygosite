import Tournaments from "@/app/models/Tournaments";
import { Deck as DeckComponent } from "../../components/Deck";
import mongoose from "mongoose";
import { getDeck } from "@/app/utils/getDeck";
import { getTournament } from "@/app/utils/getTournament";
import { notFound } from "next/navigation";

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

export default async ({ params }: any) => {
  try {
    const id = params.id;
    const tournamentRequest = await getTournament(id);
    if (tournamentRequest?.length) {
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
    }
  } catch (err) {
    return notFound();
  }
};
