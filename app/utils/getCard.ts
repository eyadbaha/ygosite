import Card from "../models/Card";
import { unstable_cache } from "next/cache";
import dbConnect from "./dbConnect";
import { YugiohCardType } from "../types/YugiohCard";

export const getCard: (id: number) => Promise<YugiohCardType | null> = unstable_cache(
  async (id: number) => {
    await dbConnect();
    const result = await Card.findOne({ id }, { _id: 0 }).lean();
    return result;
  },
  ["card"]
);
