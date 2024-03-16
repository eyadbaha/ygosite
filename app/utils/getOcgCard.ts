import Card from "../models/Card";

export const getOcgCard = async (id: number) => {
  const result = await Card.findOne({ id }, { _id: 0 }).lean();
  if (result) {
    const find = result;
    const data: any = { ...find, type: [] as string[], oldType: find.type };
    if (data.frameType == "spell") {
      data.attribute = "SPELL";
    }
    if (data.frameType == "trap") {
      data.attribute = "TRAP";
    }
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
