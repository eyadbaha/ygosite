import mongoose from "mongoose";
import z from "zod";

const schema = z.object({
  title: z.string().nonempty(),
  date: z.number(),
  details: z.string().optional(),
  game: z.string().nonempty(),
  participants: z.number(),
  state: z.union([z.string().regex(/^\d+$/).transform(Number), z.number()]),
  limit: z.number().optional(),
  organizer: z.string().nonempty().optional(),
  url: z.string().nonempty(),
  tags: z.array(z.string()),
  brackets: z.any(),
});
const tournamentZodSchema = schema.transform((obj) => {
  if (typeof obj.limit !== "number") delete obj.limit;
  return obj;
});
type tournament = z.infer<typeof tournamentZodSchema> & mongoose.Document;

const tournamentSchema = new mongoose.Schema<tournament>({
  title: {
    type: String,
    required: true,
    min: 0,
  },
  date: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    min: 0,
  },
  game: {
    type: String,
    required: true,
  },
  participants: {
    type: Number,
    required: true,
    min: 0,
  },
  state: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
  },
  organizer: {
    type: String,
    min: 0,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  brackets: {
    type: {
      players: [
        {
          id: { type: String || Number, required: true },
          place: { type: Number, required: true },
          deckType: {
            type: String,
            required: false,
          },
          deck: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
          },
        },
      ],
      matches: [{ round: Number, players: [{ id: String || Number, score: Number }] }],
    },
  },
});
tournamentSchema.index({ "brackets.matches.players.id": 1 });
export default (mongoose.models.tournament as mongoose.Model<tournament>) ||
  mongoose.model<tournament>("tournament", tournamentSchema);
