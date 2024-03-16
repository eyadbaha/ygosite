import { Deck } from "../components/Deck";
import { getDeck } from "../utils/getDeck";

export default async () => {
  const deck = await getDeck("65f53b2df0f81b41968634f6");
  return (
    <>
      {deck && (
        <>
          <p className="text-white text-responsive-1 font-KafuTechnoStd">Speed Deck #1</p>
          <br />
          <Deck {...deck} format="SPEED" />
          <br />
          <p className="text-white text-responsive-1 font-KafuTechnoStd">Speed Deck #2</p>
          <br />
          <Deck {...deck} format="SPEED" />
        </>
      )}
    </>
  );
};
