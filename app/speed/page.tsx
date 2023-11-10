import { Deck } from "../components/Deck";
import { RushCardProps } from "../components/YugiohCard";
import { getOcgCard } from "../utils/getOcgCard";
import { getSkill } from "../utils/getSkill";

export default async () => {
  const mainDeckIds: number[] = Array.from({ length: 40 }, () => 5318639);
  const extraDeckIds: number[] = Array.from({ length: 15 }, () => 44508094);
  const sideDeckIds: number[] = Array.from({ length: 15 }, () => 5318639);
  const mainDeck: RushCardProps[] = await Promise.all(
    mainDeckIds.map((id) => {
      return getOcgCard(id);
    })
  );
  const extraDeck: RushCardProps[] = await Promise.all(
    extraDeckIds.map((id) => {
      return getOcgCard(id);
    })
  );
  const sideDeck: RushCardProps[] = await Promise.all(
    sideDeckIds.map((id) => {
      return getOcgCard(id);
    })
  );

  const skill = await getSkill(2);
  const deckType = "Sevens Road";
  const deck = { mainDeck, extraDeck, sideDeck, skill, deckType };
  return (
    <>
      <p className="text-white text-responsive-1 font-KafuTechnoStd">1st Place: unknown</p>
      <br />
      <Deck {...deck} format="SPEED" />
      <br />
      <p className="text-white text-responsive-1 font-KafuTechnoStd">1st Place: unknown</p>
      <br />
      <Deck {...deck} format="SPEED" />
    </>
  );
};
