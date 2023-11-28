"use client";

import { useEffect, useState } from "react";
import { convertOcgCard } from "../utils/convertOcgCard";
import { DlContainer } from "../components/DlContainer";
import YugiohCard from "../components/YugiohCard";

export default () => {
  const [searchCards, setSearchCards] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [mainDeck, setMainDeck] = useState<any[]>([]);
  const [extraDeck, setExtraDeck] = useState<any[]>([]);
  const [sideDeck, setSideDeck] = useState<any[]>([]);
  const [skill, setSkill] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [deck, setDeck] = useState<any>({});

  const [tab, setTab] = useState<"Main" | "Extra" | "Side">("Main");
  const getCardQuantity = (id: number): number => {
    const mainDeckQuantity = mainDeck.map((card) => card.id).filter((card) => card == id).length;
    const extraDeckQuantity = extraDeck.map((card) => card.id).filter((card) => card == id).length;
    const sideDeckQuantity = sideDeck.map((card) => card.id).filter((card) => card == id).length;
    return mainDeckQuantity + extraDeckQuantity + sideDeckQuantity;
  };
  const removeCard = (id: number, type: "Main" | "Extra" | "Side") => {
    if (type == "Main") {
      const index = deck.mainDeck.findIndex((card: any) => card.id == id);
      if (index != 1) {
        setMainDeck((prev) => prev.splice(index, 1));
      }
    } else if (type == "Extra") {
      const index = deck.extraDeck.findIndex((card: any) => card.id == id);

      if (index != 1) {
        setExtraDeck((prev) => prev.splice(index, 1));
      }
    } else if (type == "Side") {
      const index = deck.sideDeck.findIndex((card: any) => card.id == id);
      if (index != 1) {
        setSideDeck((prev) => prev.splice(index, 1));
      }
    }
  };
  const [input, setInput] = useState("");
  useEffect(() => {
    const debounce = setTimeout(() => {
      const updateSearch = async () => {
        const a = await fetch(`/api/cards?name=${encodeURIComponent(input)}&limit=20&offset=0`);
        const b = await a.json();
        const data = b?.map((e: any) => {
          return convertOcgCard(e);
        });
        setSearchCards(data || []);
      };
      if (input != "") {
        updateSearch();
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [input]);
  useEffect(() => {
    setDeck({ name, mainDeck, extraDeck, sideDeck, skill, type });
  }, [name, mainDeck, extraDeck, sideDeck, skill, type]);
  useEffect(() => {
    console.log(deck);
  }, [deck]);

  return (
    <div className="text-black block">
      <input
        className="block my-3"
        placeholder="Enter deck name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select className="block my-3" onChange={(e) => setType(e.target.value)}>
        <option value="A">Black Luster Soldier</option>
        <option value="B">Live☆Twin</option>
        <option value="C">Code Talker</option>
      </select>
      <select className="block my-3" onChange={(e) => setSkill(e.target.value)}>
        <option value="A">Storm Access</option>
        <option value="B">Sevens Access Road</option>
      </select>
      <input
        className="block my-3"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="Enter card name..."
      />
      <button
        className="bg-white mb-3"
        onClick={(e) => {
          setTab("Main");
        }}
      >
        Main Deck
      </button>
      <button
        className="bg-white mx-3"
        onClick={(e) => {
          setTab("Extra");
        }}
      >
        Extra Deck
      </button>
      <button
        className="bg-white"
        onClick={(e) => {
          setTab("Side");
        }}
      >
        Side Deck
      </button>
      <div className="flex justify-between">
        <div>
          <DlContainer className="w-[620px]">
            <div className="w-full p-3">
              <div className="flex flex-wrap w-full">
                {searchCards.map((e: any) => {
                  return (
                    <div
                      className="w-[10%] p-[0.2em]  cursor-pointer"
                      onClick={() => {
                        const quantity = getCardQuantity(e.id);
                        if (quantity < 3) {
                          if (tab == "Main") {
                            setMainDeck((prev) => [...prev, e]);
                          } else if (tab == "Extra") {
                            setExtraDeck((prev) => [...prev, e]);
                          } else if (tab == "Side") {
                            setSideDeck((prev) => [...prev, e]);
                          }
                        }
                      }}
                    >
                      <YugiohCard {...e} format={"OCG"} disableModal />
                    </div>
                  );
                })}
                <br />
              </div>
            </div>
          </DlContainer>
        </div>
        <div>
          <DlContainer className="w-[620px]">
            <div className="w-full p-3">
              <div className="flex flex-wrap w-full">
                {mainDeck.map((e: any) => {
                  return (
                    <div className="w-[10%] p-[0.2em] cursor-pointer" onClick={(f) => removeCard(e.id, "Main")}>
                      <YugiohCard {...e} format={"OCG"} disableModal />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap w-full">
                {extraDeck.map((e: any) => {
                  return (
                    <div className="w-[10%] p-[0.2em] cursor-pointer" onClick={(f) => removeCard(e.id, "Extra")}>
                      <YugiohCard {...e} format={"OCG"} disableModal />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap w-full">
                {sideDeck.map((e: any) => {
                  return (
                    <div className="w-[10%] p-[0.2em] cursor-pointer" onClick={(f) => removeCard(e.id, "Side")}>
                      <YugiohCard {...e} format={"OCG"} disableModal />
                    </div>
                  );
                })}
              </div>
            </div>
          </DlContainer>
        </div>
      </div>
    </div>
  );
};
