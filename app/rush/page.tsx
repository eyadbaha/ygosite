import { Deck } from "../components/Deck";
import { getCard } from "../utils/getCard";

export default async () => {
  const mainDeckIds: number[] = [
    15194, 15194, 15649, 15649, 19570, 19570, 19138, 18606, 18607, 18607, 15809, 15809, 15809, 18604, 18604, 16967, 16967, 16967, 18602, 18602, 18602, 18603,
    18603, 16767, 16934, 16934, 16934, 18635, 18635, 18635, 19577, 19577, 19578, 19578, 16954, 19699, 19699, 19699,
  ];
  const extraDeckIds: number[] = [17002, 17002, 19568, 19568, 18620, 18620, 18621, 18621, 18622, 18622, 18623, 18623, 18623, 19684, 19684];
  const mainDeck = await Promise.all(
    mainDeckIds.map((id) => {
      return getCard(id);
    })
  );
  const extraDeck = await Promise.all(
    extraDeckIds.map((id) => {
      return getCard(id);
    })
  );

  const deckType = "Sevens Road";
  const deck = { mainDeck, extraDeck, deckType };
  return (
    <>
      <p className="text-white text-responsive-1 font-KafuTechnoStd">Rush Deck #1</p>
      <br />
      <Deck {...deck} format="RUSH" />
      <br />
      <p className="text-white text-responsive-1 font-KafuTechnoStd">Rush Deck #2</p>
      <br />
      <Deck {...deck} format="RUSH" />
    </>
  );
};
