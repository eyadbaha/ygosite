import Tournaments from "@/app/models/Tournaments";
import z from "zod";
import dbConnect from "@/app/utils/dbConnect";
const DataTypeSchema = z.object({
  scores: z.record(
    z.record(
      z.object({
        win: z.number(),
        lose: z.number(),
      })
    )
  ),
  tops: z.record(z.number()),
  wins: z.record(z.number()),
  rates: z.record(z.number()),
});
export type DataType = z.infer<typeof DataTypeSchema>;

export async function getMatchups(): Promise<DataType | null> {
  await dbConnect();
  try {
    const tournamentsWithBrackets = await Tournaments.find({
      brackets: { $exists: true, $ne: null },
      "brackets.players": { $elemMatch: { deckType: { $exists: true, $ne: null } } },
      date: { $gte: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000) }, // Filter for last 30 days
    }).select("brackets");

    const deckScores: Record<string, Record<string, { win: number; lose: number }>> = {};
    const deckWins: Record<string, number> = {};
    const deckTops: Record<string, number> = {};
    const deckWinRates: Record<string, { win: number; lose: number }> = {};
    tournamentsWithBrackets.forEach((tournament) => {
      const winningDeck = tournament.brackets.players.filter((player: any) => player.place == 1)?.[0].deckType;
      if (winningDeck) {
        if (!deckWins[winningDeck]) deckWins[winningDeck] = 1;
        else deckWins[winningDeck] = deckWins[winningDeck] + 1;
      }
      const topDecks = tournament.brackets.players.filter((player: any) => player.deckType && player.place <= 4).map((player: any) => player.deckType);
      topDecks.forEach((deck: string) => {
        if (!deckTops[deck]) deckTops[deck] = 1;
        else deckTops[deck] = deckTops[deck] + 1;
      });
      tournament.brackets.matches.forEach((match: any) => {
        if (match.players && match.players.length === 2) {
          const player1 = tournament.brackets.players.find((player: any) => player.id === match.players[0].id);
          const player2 = tournament.brackets.players.find((player: any) => player.id === match.players[1].id);

          if (player1 && player2 && player1.deckType && player2.deckType && player1.deckType !== player2.deckType) {
            const deckType1 = player1.deckType;
            const deckType2 = player2.deckType;
            const score1 = match.players[0].score;
            const score2 = match.players[1].score;

            if (!deckWinRates[deckType1]) {
              deckWinRates[deckType1] = { win: 0, lose: 0 };
            }
            deckWinRates[deckType1].win += score1;
            deckWinRates[deckType1].lose += score2;
            if (!deckWinRates[deckType2]) {
              deckWinRates[deckType2] = { win: 0, lose: 0 };
            }
            deckWinRates[deckType2].win += score2;
            deckWinRates[deckType2].lose += score1;

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

    const tops = Object.entries(deckTops)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc: Record<string, number>, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    const wins = Object.entries(deckWins)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc: Record<string, number>, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    const rates = Object.entries(deckWinRates)
      .filter((deck) => {
        return deck[1].win + deck[1].lose > 10;
      })
      .sort((a, b) => {
        return b[1].win / (b[1].win + b[1].lose) - a[1].win / (a[1].win + a[1].lose);
      })
      .reduce((transformedData: Record<string, number>, [category, { win, lose }]) => {
        transformedData[category] = win / (win + lose);
        return transformedData;
      }, {});
    const response = DataTypeSchema.parse({ scores: deckScores, tops, wins, rates });
    return response;
  } catch (error) {
    console.error("Error calculating collective deck scores:", error);
    return null;
  }
}
