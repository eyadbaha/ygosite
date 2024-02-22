import Tournaments from "@/app/models/Tournaments";
import dbConnect from "@/app/utils/dbConnect";

export default async function getMatchups(): Promise<any> {
  await dbConnect();
  try {
    const tournamentsWithBrackets = await Tournaments.find({
      brackets: { $exists: true, $ne: null },
      "brackets.players": { $elemMatch: { deckType: { $exists: true, $ne: null } } },
    }).select("brackets");

    const deckScores: Record<string, Record<string, { win: number; lose: number }>> = {};

    tournamentsWithBrackets.forEach((tournament) => {
      tournament.brackets.matches.forEach((match: any) => {
        if (match.players && match.players.length === 2) {
          const player1 = tournament.brackets.players.find((player: any) => player.id === match.players[0].id);
          const player2 = tournament.brackets.players.find((player: any) => player.id === match.players[1].id);

          if (player1 && player2 && player1.deckType && player2.deckType && player1.deckType !== player2.deckType) {
            const deckType1 = player1.deckType;
            const deckType2 = player2.deckType;
            const score1 = match.players[0].score;
            const score2 = match.players[1].score;

            // Initialize deckScores if not already present
            if (!deckScores[deckType1]) {
              deckScores[deckType1] = {};
            }
            if (!deckScores[deckType2]) {
              deckScores[deckType2] = {};
            }

            // Update scores for deckType1
            if (!deckScores[deckType1][deckType2]) {
              deckScores[deckType1][deckType2] = { win: 0, lose: 0 };
            }
            deckScores[deckType1][deckType2].win += score1;
            deckScores[deckType1][deckType2].lose += score2;

            // Update scores for deckType2
            if (!deckScores[deckType2][deckType1]) {
              deckScores[deckType2][deckType1] = { win: 0, lose: 0 };
            }
            deckScores[deckType2][deckType1].win += score2;
            deckScores[deckType2][deckType1].lose += score1;
          }
        }
      });
    });

    return deckScores;
  } catch (error) {
    console.error("Error calculating collective deck scores:", error);
  }
}
