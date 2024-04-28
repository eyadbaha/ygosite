import mongoose from "mongoose";
import z from "zod";

const articleZodSchema = z.object({
  title: z.string().min(1),
  date: z.number(),
  markdown: z.string(),
  tags: z.array(z.string()),
});
type article = z.infer<typeof articleZodSchema> & mongoose.Document;

const articleSchema = new mongoose.Schema<article>(
  {
    title: {
      type: String,
      required: true,
      min: 0,
    },
    date: {
      type: Number,
      required: true,
    },
    markdown: {
      type: String,
      min: 0,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { collection: "articles" }
);
export default (mongoose.models.articles as mongoose.Model<article>) || mongoose.model<article>("articles", articleSchema);
