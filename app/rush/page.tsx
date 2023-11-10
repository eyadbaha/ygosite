import { RushCardProps } from "../components/YugiohCard";
import { Deck } from "../components/Deck";
import { getRushCard } from "../utils/getRushCard";
import { getSkill } from "../utils/getSkill";

export default async () => {
  const mainDeckIds: number[] = [15184, 15154, 15154, 15154, 15164, 15150, 15150, 15150, 16767];
  const extraDeckIds: number[] = Array.from({ length: 8 }, () => 18947);
  const sideDeckIds: number[] = Array.from({ length: 8 }, () => 15150);
  const mainDeck: RushCardProps[] = await Promise.all(
    mainDeckIds.map((id) => {
      return getRushCard(id);
    })
  );
  const extraDeck: RushCardProps[] = await Promise.all(
    extraDeckIds.map((id) => {
      return getRushCard(id);
    })
  );
  const sideDeck: RushCardProps[] = await Promise.all(
    sideDeckIds.map((id) => {
      return getRushCard(id);
    })
  );

  const skill = await getSkill(1);
  const deckType = "Sevens Road";
  const deck = { mainDeck, extraDeck, sideDeck, skill, deckType };
  return (
    <>
      <p className="text-white text-responsive-1 font-KafuTechnoStd">1st Place: unknown</p>
      <br />
      <Deck {...deck} format="RUSH" />
      <br />
      <p className="text-white text-responsive-1 font-KafuTechnoStd">1st Place: unknown</p>
      <br />
      <Deck {...deck} format="RUSH" />
    </>
  );
};
