import mongoose from "mongoose";
import z from "zod";

const schema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  desc: z.string(),
});
type skill = z.infer<typeof schema> & mongoose.Document;

const skillSchema = new mongoose.Schema<skill>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    character: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { collection: "skills" }
);
export default (mongoose.models.skills as mongoose.Model<skill>) || mongoose.model<skill>("skills", skillSchema);
