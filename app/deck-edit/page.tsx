"use client";

import { useEffect, useState } from "react";
import { convertOcgCard } from "../utils/convertOcgCard";
import { DlContainer } from "../components/DlContainer";
import YugiohCard from "../components/YugiohCard";

export default () => {
  const [searchCards, setSearchCards] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [format, setFormat] = useState<"sd" | "md" | "ocg">("sd");
  const [mainDeck, setMainDeck] = useState<any[]>([]);
  const [extraDeck, setExtraDeck] = useState<any[]>([]);
  const [sideDeck, setSideDeck] = useState<any[]>([]);
  const [skill, setSkill] = useState<string>("None");
  const [type, setType] = useState<string>("Tenyi");
  const [skills, setSkills] = useState<{ name: string }[]>([]);
  const [deck, setDeck] = useState<any>({});
  const [searchKey, setSearchKey] = useState<number>(0);
  const deckTypes = [
    "Tachyon",
    "Shiranui",
    "Galaxy-Eyes",
    "Infinitrack",
    "Constellar",
    "Destiny HERO",
    "Gunkan Suship",
    "Lunalight",
    "Shaddoll",
    "Gearfried",
    "Gimmick Puppet",
    "Infernoid",
    "Rose Dragon",
    "Speedroid",
    "Mayakashi",
    "Tenyi",
    "Yubel",
    "Live☆Twin",
    "S-Force",
    "Trickstar",
    "Black Luster Soldier",
    "Salamangreat",
    "Charmer",
    "Rokket",
    "Madolche",
    "Abyss Actor",
    "Altergeist",
    "Blue-Eyes",
    "Elemental HERO",
    "Fossil",
    "Synchron",
    "Amazement",
  ];
  const deckSortFunction = (a: any, b: any) => {
    const typeOrder: { [key: string]: number } = {
      "Normal Monster": 0,
      "Effect Monster": 1,
      "Ritual Monster": 2,
      "Ritual Effect Monster": 2,
      "Spell Card": 3,
      "Trap Card": 4,
      "Fusion Monster": 5,
      "Synchro Monster": 6,
      "XYZ Monster": 7,
      "Link Monster": 8,
    };

    const defaultTypeOrder = -1;
    const typeComparison = (typeOrder[a.oldType] || defaultTypeOrder) - (typeOrder[b.oldType] || defaultTypeOrder);
    console.log(a.oldType, b.oldType);
    if (typeComparison !== 0) {
      return typeComparison;
    }

    return a.name.localeCompare(b.name);
  };
  const [tab, setTab] = useState<"Main" | "Extra" | "Side">("Main");
  const getCardQuantity = (id: number): number => {
    const mainDeckQuantity = mainDeck.map((card) => card.id).filter((card) => card == id).length;
    const extraDeckQuantity = extraDeck.map((card) => card.id).filter((card) => card == id).length;
    const sideDeckQuantity = sideDeck.map((card) => card.id).filter((card) => card == id).length;
    return mainDeckQuantity + extraDeckQuantity + sideDeckQuantity;
  };
  const removeCard = (id: number, type: "Main" | "Extra" | "Side") => {
    if (type == "Main") {
      const index = deck.mainDeck.findIndex((card: any) => card == id);
      if (index != -1) {
        console.log(index);
        setMainDeck((prev) => prev.filter((_, i) => i !== index));
      }
    } else if (type == "Extra") {
      const index = deck.extraDeck.findIndex((card: any) => card == id);

      if (index != -1) {
        setExtraDeck((prev) => prev.filter((_, i) => i !== index));
      }
    } else if (type == "Side") {
      const index = deck.sideDeck.findIndex((card: any) => card == id);
      if (index != -1) {
        setSideDeck((prev) => prev.filter((_, i) => i !== index));
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
        setSearchKey((prev) => prev + 1);
      };
      if (input != "") {
        updateSearch();
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [input]);
  useEffect(() => {
    setDeck({
      name,
      mainDeck: mainDeck.map((deck) => deck.id),
      extraDeck: extraDeck.map((deck) => deck.id),
      sideDeck: sideDeck.map((deck) => deck.id),
      skill,
      type,
      format,
    });
  }, [name, mainDeck, extraDeck, sideDeck, skill, type]);
  useEffect(() => {
    console.log(deck);
  }, [deck]);
  useEffect(() => {}, [tab]);
  useEffect(() => {
    const getSkills = async () => {
      const Request = await fetch("/api/skills");
      const skills = await Request.json();
      if (skills) setSkills(skills);
    };
    getSkills();
  }, []);
  return (
    <div className="text-black block">
      <input
        className="block my-3"
        placeholder="Enter deck name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select className="block my-3" onChange={(e) => setFormat(e.target.value as any)}>
        <option value={"sd"} key="sd">
          Speed Duel
        </option>
        <option value={"md"} key="md">
          Master Duel
        </option>
        <option value={"ocg"} key="ocg">
          Official Card Game
        </option>
      </select>
      <select className="block my-3" onChange={(e) => setType(e.target.value)}>
        {deckTypes.map((type) => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </select>
      <select className="block my-3" onChange={(e) => setSkill(e.target.value)}>
        <option value="Storm Access" key={"Storm Access"}>
          None
        </option>
        {skills.map((skill) => {
          return (
            <option value={skill.name} key={skill.name}>
              {skill.name}
            </option>
          );
        })}
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
        className="bg-white mb-3 ring ring-blue-500 ring-offset-2"
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
      <br />
      <button
        className="bg-white"
        onClick={async (e) => {
          const result = await fetch("/api/deck", { method: "post", body: JSON.stringify({ deck: deck }) });
          const response = await result.text();
          console.log(response);
        }}
      >
        Save Deck
      </button>
      <br />
      <div className="flex justify-between">
        <div>
          <DlContainer className="w-[620px]" key={searchKey}>
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
                            setMainDeck((prev) => [...prev, e].sort(deckSortFunction));
                          } else if (tab == "Extra") {
                            setExtraDeck((prev) => [...prev, e].sort(deckSortFunction));
                          } else if (tab == "Side") {
                            setSideDeck((prev) => [...prev, e].sort(deckSortFunction));
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
              Main Deck:
              <div className="flex flex-wrap w-full">
                {mainDeck.map((e: any) => {
                  return (
                    <div className="w-[10%] p-[0.2em] cursor-pointer" onClick={(f) => removeCard(e.id, "Main")}>
                      <YugiohCard {...e} format={"OCG"} disableModal />
                    </div>
                  );
                })}
              </div>
              Extra Deck:
              <div className="flex flex-wrap w-full">
                {extraDeck.map((e: any) => {
                  return (
                    <div className="w-[10%] p-[0.2em] cursor-pointer" onClick={(f) => removeCard(e.id, "Extra")}>
                      <YugiohCard {...e} format={"OCG"} disableModal />
                    </div>
                  );
                })}
              </div>
              Side Deck:
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
