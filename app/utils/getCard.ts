import Card from "../models/Card";
import { unstable_cache } from "next/cache";
import dbConnect from "./dbConnect";

export const getCard = unstable_cache(
  async (id: number) => {
    await dbConnect();
    const result = await Card.findOne({ id }, { _id: 0 }).lean();
    if (result) {
      if (result.types.includes("Spell")) {
        result.attribute = "SPELL";
      }
      if (result.types.includes("Spell")) {
        result.attribute = "TRAP";
      }
      return result;
    } else
      return {
        id: 404,
        name: "Card not found",
        desc: "Card data couldn't be found in the database.",
        art: 1,
        rarity: "UR",
        types: ["Error"],
        attribute: "DARK",
        legend: false,
      };
  },
  ["card"]
);
