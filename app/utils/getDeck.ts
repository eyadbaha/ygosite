import Deck from "../models/Deck";
import Skill from "../models/Skill";
import dbConnect from "../utils/dbConnect";
import mongoose from "mongoose";
import Card from "@/app/models/Card";
import { unstable_cache } from "next/cache";
export const getDeck = unstable_cache(
  async (id: string) => {
    try {
      await dbConnect();
      const db = mongoose.connection;
      await Skill;
      const deck = await Deck.findById(id, { _id: 0 }).lean();
      let skill: any = null;
      if (deck) {
        if (deck?.skill) {
          const skillDB = await db.collection("dlmSkills").findOne({ name: deck.skill });
          if (skillDB) {
            skill = {
              id: skillDB.id,
              name: skillDB.name,
              desc: skillDB.description,
              character: skillDB?.characters[0]?.character?.name || "UnknownCharater",
              format: "SPEED",
            };
          }
        }
        const mainDeckRequest: any[] = await Card.find({ id: { $in: deck.mainDeck } }, { _id: 0 }).lean();
        const extraDeckRequest: any[] = await Card.find({ id: { $in: deck.extraDeck } }, { _id: 0 }).lean();
        const sideDeckRequest: any[] = await Card.find({ id: { $in: deck.sideDeck } }, { _id: 0 }).lean();
        const mainDeck = mainDeckRequest
          .map((card) => {
            return Array.from({ length: (deck.mainDeck as number[]).filter((item) => item === card.id).length }, () => card);
          })
          .flat()
          .sort((a: any, b: any) => {
            const index1 = deck.mainDeck.findIndex((element) => element === a.id);
            const index2 = deck.mainDeck.findIndex((element) => element === b.id);
            return index1 - index2;
          });
        const extraDeck = extraDeckRequest
          .map((card) => {
            return Array.from({ length: (deck.extraDeck as number[])?.filter((item) => item === card.id).length } || 0, () => card);
          })
          .flat();
        const sideDeck = sideDeckRequest
          .map((card) => {
            return Array.from({ length: (deck.sideDeck as number[])?.filter((item) => item === card.id).length } || 0, () => card);
          })
          .flat();
        const result = { ...deck, mainDeck, extraDeck, sideDeck, skill };
        if (skill) result.skill = skill;
        return result;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  ["deck"]
);
