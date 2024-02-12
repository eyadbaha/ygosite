import Image from "next/image";
import YugiohCard, { RushCardProps } from "./YugiohCard";
import FallbackImage from "./FallbackImage";
import { Skill, SkillProps } from "./Skill";
import { RushContainer } from "./RushContainer";
import { HTMLProps } from "react";
import { DlContainer } from "./DlContainer";
import { MasterContainer } from "./MasterContainer";

type RushDeckProps = {
  //deckType: string;
  mainDeck: RushCardProps[];
  extraDeck?: RushCardProps[];
  sideDeck?: RushCardProps[];
  skill?: SkillProps;
  format: "OCG" | "MASTER" | "SPEED" | "RUSH";
};

export const Deck = (props: RushDeckProps) => {
  let Container: (props: HTMLProps<HTMLDivElement>) => JSX.Element;
  if (props.format == "RUSH") {
    Container = RushContainer;
  } else if (props.format == "SPEED") {
    Container = MasterContainer;
  } else {
    Container = DlContainer;
  }
  const normal = props.mainDeck.filter((e) => {
    return (
      e.type.some((str) => str === "Normal") &&
      !e.type.some((str) => str === "Spell") &&
      !e.type.some((str) => str === "Trap")
    );
  }).length;
  const effect = props.mainDeck.filter((e) => {
    return (
      e.type.some((str) => str === "Effect") &&
      !e.type.some((str) => str === "Ritual") &&
      !e.type.some((str) => str === "Fusion") &&
      !e.type.some((str) => str === "Synchro") &&
      !e.type.some((str) => str === "Xyz") &&
      !e.type.some((str) => str === "Link")
    );
  }).length;
  const ritual = props.mainDeck.filter((e) => {
    return e.type.some((str) => str === "Ritual");
  }).length;
  const fusion =
    props.extraDeck?.filter((e) => {
      return e.type.some((str) => str === "Fusion");
    }).length || 0;
  const synchro =
    props.extraDeck?.filter((e) => {
      return e.type.some((str) => str === "Synchro");
    }).length || 0;
  const xyz =
    props.extraDeck?.filter((e) => {
      return e.type.some((str) => str === "Xyz");
    }).length || 0;
  const link =
    props.extraDeck?.filter((e) => {
      return e.type.some((str) => str === "Link");
    }).length || 0;
  const spell = props.mainDeck.filter((e) => {
    return e.attribute == "SPELL";
  }).length;
  const trap = props.mainDeck.filter((e) => {
    return e.attribute == "TRAP";
  }).length;
  const mainDeck = props.mainDeck.length;
  const sideDeck = props.sideDeck?.length;
  const extraDeck = props.extraDeck?.length;
  return (
    <>
      <Container className="w-[620px]">
        {/*Character and Skill Section*/}
        {props.skill && (
          <>
            <div className="grid grid-cols-6 grid-rows-3 w-full p-3 pb-0">
              <div className="col-span-1 row-span-3">
                <FallbackImage
                  src={`/img/characters/${props.skill.character}.png`}
                  fallback="/img/characters/UnknownCharater.png"
                  alt="Character"
                  width={100}
                  height={100}
                ></FallbackImage>
              </div>
              <div className="col-span-2 row-span-2">
                <p>Main Deck:{mainDeck}</p>
                {extraDeck && <p>Extra Deck:{extraDeck}</p>}
                {sideDeck && <p>Side Deck:{sideDeck}</p>}
              </div>
              <div className="col-start-2 row-start-3 col-span-4 row-span-1 flex justify-center items-end">
                <div className="flex items-center justify-center gap-1">
                  <FallbackImage
                    className="w-7 h-7"
                    src="/img/icons/skill.png"
                    fallback="/img/icons/skill.png"
                    alt="Skill"
                    width={100}
                    height={100}
                  />
                  <Skill {...props.skill} format={props.format} />
                </div>
              </div>
              <div className="col-start-4 row-start-1 col-span-3 row-span-2 flex justify-end items-start">
                <div className="flex flex-wrap justify-center items-center gap-1 w-[55%]">
                  {props.format == "RUSH" ? (
                    <>
                      <div className="flex w-full items-center  place-content-start gap-1">
                        <Image src="/img/icons/deck/rush_normal.png" alt="Normal Monsters" width={15} height={15} />
                        <span>{normal}</span>
                        <Image src="/img/icons/deck/rush_effect.png" alt="Effect Monsters" width={15} height={15} />
                        <span>{effect}</span>
                        <Image src="/img/icons/deck/rush_fusion.png" alt="Fusion Monsters" width={15} height={15} />
                        <span>{fusion}</span>
                        <Image src="/img/icons/deck/rush_spell.png" alt="Spell Cards" width={15} height={15} />
                        <span>{spell}</span>
                        <Image src="/img/icons/deck/rush_trap.png" alt="Trap Cards" width={15} height={15} />
                        <span>{trap}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex w-full items-center  place-content-start gap-1">
                        <Image src="/img/icons/deck/normal.png" alt="Normal Monsters" width={15} height={15} />
                        <span>{normal}</span>
                        <Image src="/img/icons/deck/effect.png" alt="Effect Monsters" width={15} height={15} />
                        <span>{effect}</span>
                        <Image src="/img/icons/deck/ritual.png" alt="Effect Monsters" width={15} height={15} />
                        <span>{ritual}</span>
                        <Image src="/img/icons/deck/spell.png" alt="Spell Cards" width={15} height={15} />
                        <span>{spell}</span>
                        <Image src="/img/icons/deck/trap.png" alt="Trap Cards" width={15} height={15} />
                        <span>{trap}</span>
                      </div>
                      <div className="flex w-full items-center place-content-start gap-1">
                        <Image src="/img/icons/deck/fusion.png" alt="Fusion Monsters" width={15} height={15} />
                        <span>{fusion}</span>
                        <Image src="/img/icons/deck/synchro.png" alt="Spell Cards" width={15} height={15} />
                        <span>{synchro}</span>
                        <Image src="/img/icons/deck/xyz.png" alt="Spell Cards" width={15} height={15} />
                        <span>{xyz}</span>
                        <Image src="/img/icons/deck/link.png" alt="Spell Cards" width={15} height={15} />
                        <span>{link}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/*Deck Section*/}
        {/*Main Deck Section*/}
        <div className="w-full p-3">
          <div className="flex flex-wrap w-full">
            {props.mainDeck.map((e, index) => {
              return (
                <div className="w-[10%] p-[0.2em]" key={index}>
                  <YugiohCard {...e} rarity={e.rarity || "UR"} format={props.format} />
                </div>
              );
            })}
          </div>
          {/*Extra Deck Section*/}
          {props.extraDeck && (
            <>
              <p>Extra Deck:</p>
              <div className="flex flex-wrap w-full">
                {props.extraDeck.map((e, index) => {
                  return (
                    <div className="w-[10%] p-[0.2em]" key={index}>
                      <YugiohCard {...e} rarity={e.rarity || "UR"} format={props.format} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {/*Side Deck Section*/}
          {props.sideDeck && (
            <>
              <p>Side Deck:</p>
              <div className="flex flex-wrap w-full">
                {props.sideDeck.map((e, index) => {
                  return (
                    <div className="w-[10%] p-[0.2em]" key={index}>
                      <YugiohCard {...e} rarity={e.rarity || "UR"} format={props.format} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
};
