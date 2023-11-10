import * as database from "../data/ocg.json";
import { RushCardProps } from "../components/YugiohCard";

export const getOcgCard = async (id: number) => {
  const find =
    (database as any).find((card: any) => card.id == id) ||
    ({
      id: 404,
      name: "Card not found",
      desc: "Card data couldn't be found in the database.",
      art: 1,
      rarity: "UR",
      type: ["Error"],
      attribute: "DARK",
      legend: false,
    } as RushCardProps);
  const data = { ...find };
  if (data.frameType == "spell") {
    data.attribute = "SPELL";
  }
  if (data.frameType == "trap") {
    data.attribute = "TRAP";
  }
  if (typeof data.type == "string") {
    let type = data.type
      .replace(/Spell Card/g, "")
      .replace(/Trap Card/g, "")
      .replace(/ Monster/g, "");
    type && (type = type.split(" "));
    data.type = [];
    data.race && data.type.push(data.race);
    type && data.type.push(...type);
    type && !type.includes("Normal") && !type.includes("Effect") && data.type.push("Effect");
  }
  if (data.linkval) data.level = data.linkval;
  return data;
};
