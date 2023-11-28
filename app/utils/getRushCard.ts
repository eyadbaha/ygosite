import { RushCardProps } from "../components/YugiohCard";
import Rush from "../models/Rush";
import dbConnect from "./dbConnect";

export const getRushCard = async (id: number) => {
  await dbConnect();
  const data = await Rush.findOne({ id: id }, { _id: 0 }).lean();
  return (data || {
    id: 404,
    name: "Card not found",
    desc: "Card data couldn't be found in the database.",
    art: 1,
    rarity: "UR",
    type: ["Error"],
    attribute: "DARK",
    legend: false,
  }) as RushCardProps;
};
