import * as database from "@/app/data/rush.json";
import { RushCardProps } from "../components/YugiohCard";

export const getRushCard = async (id: number) => {
  return ((database as any).find((card: any) => card.id == id) || {
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
