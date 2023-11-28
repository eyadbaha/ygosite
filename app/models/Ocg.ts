import mongoose from "mongoose";
import z from "zod";

const schema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  frameType: z.string(),
  desc: z.string(),
  race: z.string(),
  atk: z.number().optional(),
  def: z.number().optional(),
  attribute: z.string().optional(),
  level: z.number().optional(),
  scale: z.number().optional(),
  linkval: z.number().optional(),
  linkmarkers: z.array(z.string()).optional(),
});
type ocg = z.infer<typeof schema> & mongoose.Document;

const ocgSchema = new mongoose.Schema<ocg>(
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
      type: String,
      required: true,
    },
    frameType: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    race: {
      type: String,
      required: true,
    },
    atk: {
      type: Number,
      min: 0,
    },
    def: {
      type: Number,
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
    scale: {
      type: Number,
      min: 0,
      max: 13,
    },
    linkval: {
      type: Number,
      min: 1,
      max: 8,
    },
    linkmarkers: {
      type: [String],
    },
  },
  { collection: "ocgCards" }
);
export default (mongoose.models.ocgCards as mongoose.Model<ocg>) || mongoose.model<ocg>("ocgCards", ocgSchema);
