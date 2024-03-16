import Deck from "../models/Deck";
import Skill from "../models/Skill";
import dbConnect from "../utils/dbConnect";
import mongoose from "mongoose";
import { getCard } from "./getCard";

export const getDeck = async (id: string) => {
  try {
    await dbConnect();
    const db = mongoose.connection;
    await Skill;
    const deck = await Deck.findById(id, { _id: 0 }).lean();
    let skill: any = {};
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
      const mainDeck: any[] = (await Promise.all(deck.mainDeck?.map((id) => getCard(id)))) || [];
      const extraDeck: any[] = deck.extraDeck ? await Promise.all(deck.extraDeck?.map((id) => getCard(id))) : [];
      const sideDeck: any[] = deck.sideDeck ? await Promise.all(deck.sideDeck?.map((id) => getCard(id))) : [];
      return { ...deck, mainDeck, extraDeck, sideDeck, skill };
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
