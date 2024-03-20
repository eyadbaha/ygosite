import Deck from "../models/Deck";
import Skill from "../models/Skill";
import dbConnect from "../utils/dbConnect";
import mongoose from "mongoose";
import { getCard } from "./getCard";
import Card from "@/app/models/Card";

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
      const mainDeckRequest: any[] = await Card.find({ id: { $in: deck.mainDeck } }, { _id: 0 }).lean();
      const extraDeckRequest: any[] = await Card.find({ id: { $in: deck.extraDeck } }, { _id: 0 }).lean();
      const sideDeckRequest: any[] = await Card.find({ id: { $in: deck.sideDeck } }, { _id: 0 }).lean();
      const mainDeck = mainDeckRequest
        .map((card) => {
          return Array.from({ length: (deck.mainDeck as number[]).filter((item) => item === card.id).length }, () => card);
        })
        .flat();
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
      return { ...deck, mainDeck, extraDeck, sideDeck, skill };
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
