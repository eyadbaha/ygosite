export const convertOcgCard = (card: any) => {
  if (card) {
    const data = { ...card, type: [] as string[], oldType: card.type };
    if (data.frameType == "spell") {
      data.attribute = "SPELL";
    }
    if (data.frameType == "trap") {
      data.attribute = "TRAP";
    }
    if (typeof data.type == "string") {
      let type: any = data.oldType
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
