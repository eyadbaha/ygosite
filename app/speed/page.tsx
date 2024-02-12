import { Deck } from "../components/Deck";
import { getDeck } from "../utils/getDeck";

export default async () => {
  const deck = await getDeck("65ca3f14f9581daa917c7ba1");
  return (
    <>
      {deck && (
        <>
          <p className="text-white text-responsive-1 font-KafuTechnoStd">1st Place: unknown</p>
          <br />
          <Deck {...deck} format="SPEED" />
          <br />
          <p className="text-white text-responsive-1 font-KafuTechnoStd">1st Place: unknown</p>
          <br />
          <Deck {...deck} format="SPEED" />
        </>
      )}
    </>
  );
};
