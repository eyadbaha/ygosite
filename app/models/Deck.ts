import mongoose from "mongoose";
import z from "zod";

const schema = z.object({
  mainDeck: z.array(z.number()).min(20).max(60),
  extraDeck: z.array(z.number()).max(15).optional(),
  sideDeck: z.array(z.number()).max(15).optional(),
  skill: z.string().optional(),
  type: z.string(),
  name: z.string(),
  format: z.enum(["sd", "md", "ocg", "rd"]),
});
type deck = z.infer<typeof schema> & mongoose.Document;

const deckSchema = new mongoose.Schema<deck>(
  {
    mainDeck: {
      type: [Number],
      required: true,
    },
    extraDeck: [Number],
    sideDeck: [Number],
    skill: String,
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      enum: ["sd", "md", "ocg", "rd"],
      default: "ocg",
      required: true,
    },
  },
  { collection: "decks" }
);
export default (mongoose.models.decks as mongoose.Model<deck>) || mongoose.model<deck>("decks", deckSchema);
