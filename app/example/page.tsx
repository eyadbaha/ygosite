import { Deck } from "../components/Deck";
import { getDeck } from "../utils/getDeck";

export default async () => {
  const MasterDeck = await getDeck("662c298a62c91a12a0761b60");
  const SpeedDeck = await getDeck("65f53b2df0f81b41968634f6");
  const RushDeck = await getDeck("65f712dc47d99108a5b47c87");
  return (
    <>
      {MasterDeck && SpeedDeck && RushDeck && (
        <>
          <p className="text-white text-responsive-1 font-KafuTechnoStd">Speed Deck</p>
          <br />
          <Deck {...SpeedDeck} format="SPEED" />
          <br />
          <p className="text-white text-responsive-1 font-KafuTechnoStd">Rush Deck</p>
          <br />
          <Deck {...RushDeck} format="RUSH" />
          <p className="text-white text-responsive-1 font-KafuTechnoStd">Master Deck</p>
          <br />
          <Deck {...MasterDeck} format="MASTER" />
          <p className="text-white text-responsive-1 font-KafuTechnoStd">Ocg Deck</p>
          <br />
          <Deck {...MasterDeck} format="OCG" />
        </>
      )}
    </>
  );
};
