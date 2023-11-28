import mongoose from "mongoose";
import z from "zod";

const schema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.array(z.string()),
  desc: z.string(),
  atk: z.string().optional(),
  maxAtk: z.string().optional(),
  def: z.string().optional(),
  legend: z.boolean().default(false),
  attribute: z.string().optional(),
  level: z.number().optional(),
});
type rush = z.infer<typeof schema> & mongoose.Document;

const rushSchema = new mongoose.Schema<rush>(
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
    type: {
      type: [String],
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    atk: {
      type: String,
    },
    maxAtk: {
      type: String,
    },
    def: {
      type: String,
      min: 0,
    },
    attribute: {
      type: String,
    },
    level: {
      type: Number,
      min: 0,
      max: 13,
    },
  },
  { collection: "rushCards" }
);
export default (mongoose.models.rushCards as mongoose.Model<rush>) || mongoose.model<rush>("rushCards", rushSchema);
