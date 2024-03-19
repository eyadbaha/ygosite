import { Deck } from "../components/Deck";
import { getDeck } from "../utils/getDeck";

export default async () => {
  const deck = await getDeck("65f712dc47d99108a5b47c87");
  return (
    <>
      {deck && (
        <>
          <p className="text-white text-responsive-1 font-KafuTechnoStd">Rush Deck #1</p>
          <br />
          <Deck {...deck} format="RUSH" />
          <br />
          <p className="text-white text-responsive-1 font-KafuTechnoStd">Rush Deck #2</p>
          <br />
          <Deck {...deck} format="RUSH" />
        </>
      )}
    </>
  );
};
