"use client";
import { useEffect, useState } from "react";

const speedDeckTypes = [
  "Sky Striker",
  "Zombie",
  "Tech Genus",
  "Blue-Eyes",
  "Tachyon",
  "Shiranui",
  "Kozmo",
  "Evil Eye",
  "Gladiator Beast",
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
const masterDeckTypes = [
  "Rescue-ACE",
  "Purrely",
  "Snake-Eye",
  "Tearlaments",
  "Branded",
  "Labrynth",
  "Unchained",
  "Mikanko",
  "Chimera",
  "Mathmech",
  "Vanquish Soul",
  "Mannadium",
  "Superheavy Samurai",
  "Dragon Link",
  "Dinos",
  "HERO",
  "Spright",
  "Plunder Patroll",
  "Pendulum Magician",
  "Kashtira",
  "@Ignister",
  "Dragon Ruler",
  "Marincess",
  "Tellarknight",
  "Adamancipator",
  "Rikka",
];
const DeckOptions = (props: { format: string[] }) => {
  if (props.format.includes("sd"))
    return (
      <>
        {speedDeckTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </>
    );
  return (
    <>
      {masterDeckTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </>
  );
};
export default ({ params }: any) => {
  const id = params.id;
  const [tournament, setTournament] = useState<any>(null);
  const [decks, setDecks] = useState<any[]>([]);
  const [updatedDecks, setUpdatedDecks] = useState<any[]>([]);
  useEffect(() => {
    const fetchTournament = async () => {
      const request = await fetch(`/api/tournaments?id=${id}`);
      const json = await request.json();
      const decks = json.players.map((player: any) => {
        const result: any = {};
        player.deckType && (result.deckType = player.deckType);
        player.deck && (result.deck = player.deck);
        if (result.deck || result.deckType) return result;
        return null;
      });
      setUpdatedDecks(decks);
      setTournament(json);
    };
    const fetchDecks = async () => {
      const request = await fetch("/api/deck/all");
      const json = await request.json();
      setDecks(json);
    };
    fetchTournament();
    fetchDecks();
  }, []);

  return (
    <>
      <p>{tournament?.title}</p>
      {tournament?.players && (
        <div>
          {tournament?.players.map((player: any, index: number) => (
            <div>
              {player.name}/{player.id}
              <select
                className={"text-black"}
                onChange={(e) => {
                  setUpdatedDecks((prevItems: any) => {
                    const value = e.target.value == "None" ? null : e.target.value;
                    const newItems = [...prevItems];
                    const fifthItemIndex = index;
                    if (newItems[fifthItemIndex]) newItems[fifthItemIndex].deck = value;
                    else newItems[fifthItemIndex] = { deck: value };
                    return newItems;
                  });
                }}
              >
                <option key={"None"} value={"None"}>
                  None
                </option>
                {decks.map((deck) => (
                  <option key={deck._id} value={deck._id}>
                    {deck.name}
                  </option>
                ))}
              </select>
              <select
                className={"text-black"}
                onChange={(e) => {
                  setUpdatedDecks((prevItems: any) => {
                    const value = e.target.value == "None" ? null : e.target.value;
                    const newItems = [...prevItems];
                    const fifthItemIndex = index;
                    if (newItems[fifthItemIndex]) newItems[fifthItemIndex].deckType = value;
                    else newItems[fifthItemIndex] = { deckType: value };
                    return newItems;
                  });
                }}
              >
                <option key={"None"} value={"None"}>
                  None
                </option>
                <DeckOptions format={tournament.tags} />
              </select>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={async (e) => {
          e.preventDefault();
          await fetch("/api/tournaments", {
            body: JSON.stringify({ id: id, info: updatedDecks }),
            method: "PATCH",
          });
        }}
      >
        kool
      </button>
    </>
  );
};
