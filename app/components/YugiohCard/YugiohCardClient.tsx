"use client";

import { useEffect, useState } from "react";
import YugiohCard from "@/app/components/YugiohCard/Client";

interface YugiohCardClientProps {
  id: number;
  inline?: boolean;
}
export default (props: YugiohCardClientProps) => {
  const [data, setData] = useState(<span>Loading...</span>);
  useEffect(() => {
    const getCard = async () => {
      const data = await fetch(`/api/cards?id=${props.id}`);
      const res = await data?.json();
      if (!res[0]?.name) setData(<span className="text-red-500">Card Not Found</span>);
      else setData(<YugiohCard inline={props.inline} format="SPEED" card={res[0]} />);
    };
    getCard();
  }, []);
  if (data) return data;
  return data;
};
