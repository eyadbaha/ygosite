import Ocg from "../models/Ocg";

export const getOcgCard = async (id: number) => {
  const result = await Ocg.findOne({ id }, { _id: 0 }).lean();
  if (result) {
    const find = result;
    const data: any = { ...find, type: [] as string[], oldType: find.type };
    if (data.frameType == "spell") {
      data.attribute = "SPELL";
    }
    if (data.frameType == "trap") {
      data.attribute = "TRAP";
    }
    let type: any = data.oldType
      .replace(/Spell Card/g, "")
      .replace(/Trap Card/g, "")
      .replace(/ Monster/g, "");
    type && (type = type.split(" "));
    data.type = [];
    data.race && data.type.push(data.race);
    type && data.type.push(...type);
    type && !type.includes("Normal") && !type.includes("Effect") && data.type.push("Effect");
    if (data.linkval) data.level = data.linkval;
    delete data.card_images;
    delete data.card_prices;
    delete data.card_sets;
    return data;
  } else
    return {
      id: 404,
      name: "Card not found",
      desc: "Card data couldn't be found in the database.",
      art: 1,
      rarity: "UR",
      type: ["Error"],
      attribute: "DARK",
      legend: false,
    };
};
