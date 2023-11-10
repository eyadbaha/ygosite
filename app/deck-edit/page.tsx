"use client";

import { useEffect, useState } from "react";
import { getOcgCard } from "../utils/getOcgCard";
import { CardSearchResults } from "../components/card-search-results/CardSearchResults";

export default () => {
  const [cards, setDeck] = useState<any>([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    const debounce = setTimeout(() => {
      const updateSearch = async () => {
        const a = await fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(input)}&num=20&offset=0`
        );
        const b = await a.json();
        const data = await Promise.all(
          b.data
            ?.map((e: any) => {
              return e.id;
            })
            .map((e: number) => {
              return getOcgCard(e);
            })
        );
        setDeck(data || []);
      };
      if (input != "") {
        updateSearch();
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [input]);
  return (
    <div>
      <input
        className="text-black"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
      <CardSearchResults cards={cards} format="OCG" />
    </div>
  );
};
