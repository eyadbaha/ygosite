"use client";

import { useEffect, useState } from "react";
import YugiohCard from "@/app/components/YugiohCard/Client";

interface YugiohCardClientProps {
  id: number;
  inline?: boolean;
}
const UnknownCard = {
  id: 404,
  name: "Card not found",
  desc: "Card data couldn't be found in the database.",
  art: 1,
  rarity: "UR",
  types: ["Error"],
  attribute: "DARK",
  legend: false,
} as any;
export default (props: YugiohCardClientProps) => {
  const [data, setData] = useState(<span>Loading...</span>);
  useEffect(() => {
    const getCard = async () => {
      const data = await fetch(`/api/cards?id=${props.id}`);
      const res = await data?.json();
      if (!res[0]?.name) setData(<YugiohCard inline={props.inline} format="SPEED" card={UnknownCard} />);
      else setData(<YugiohCard inline={props.inline} format="SPEED" card={res[0]} />);
    };
    getCard();
  }, []);
  if (data) return data;
  return data;
};
