import mongoose from "mongoose";
import z from "zod";

const schema = z.object({
  main: z.array(z.number()).min(20).max(60),
  extra: z.array(z.number()).max(15).optional(),
  side: z.array(z.number()).max(15).optional(),
  skill: z.number().optional(),
  type: z.string(),
  name: z.string(),
});
type deck = z.infer<typeof schema> & mongoose.Document;

const deckSchema = new mongoose.Schema<deck>(
  {
    main: {
      type: [Number],
      required: true,
    },
    extra: [Number],
    side: [Number],
    skill: Number,
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { collection: "decks" }
);
export default (mongoose.models.decks as mongoose.Model<deck>) || mongoose.model<deck>("decks", deckSchema);
