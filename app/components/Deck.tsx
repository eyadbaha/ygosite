import Image from "next/image";
import YugiohCard, { YugiohCardProps } from "./YugiohCard/Client";
import FallbackImage from "./FallbackImage";
import { Skill, SkillProps } from "./Skill";
import { HTMLProps } from "react";
import { YugiohCardType } from "../types/YugiohCard";

type RushDeckProps = {
  //deckType: string;
  mainDeck: YugiohCardType[];
  extraDeck?: YugiohCardType[];
  sideDeck?: YugiohCardType[];
  skill?: SkillProps;
  format: "OCG" | "MASTER" | "SPEED" | "RUSH";
};

export const Deck = (props: RushDeckProps) => {
  let Container: string;
  if (props.format == "RUSH") {
    Container = " dl-rush-container";
  } else if (props.format == "SPEED") {
    Container = " dl-speed-container";
  } else {
    Container = " md-container";
  }
  const normal = props.mainDeck.filter((e) => {
    return e.types.some((str) => str === "Normal");
  }).length;
  const effect = props.mainDeck.filter((e) => {
    return (
      e.types.some((str) => str === "Effect") &&
      !e.types.some((str) => str === "Ritual") &&
      !e.types.some((str) => str === "Fusion") &&
      !e.types.some((str) => str === "Synchro") &&
      !e.types.some((str) => str === "Xyz") &&
      !e.types.some((str) => str === "Link")
    );
  }).length;
  const ritual = props.mainDeck.filter((e) => {
    return e.types.some((str) => str === "Ritual");
  }).length;
  const fusion =
    props.extraDeck?.filter((e) => {
      return e.types.some((str) => str === "Fusion");
    }).length || 0;
  const synchro =
    props.extraDeck?.filter((e) => {
      return e.types.some((str) => str === "Synchro");
    }).length || 0;
  const xyz =
    props.extraDeck?.filter((e) => {
      return e.types.some((str) => str === "Xyz");
    }).length || 0;
  const link =
    props.extraDeck?.filter((e) => {
      return e.types.some((str) => str === "Link");
    }).length || 0;
  const spell = props.mainDeck.filter((e) => {
    return e.types.includes("Spell");
  }).length;
  const trap = props.mainDeck.filter((e) => {
    return e.types.includes("Trap");
  }).length;
  const mainDeck = props.mainDeck.length;
  const sideDeck = props.sideDeck?.length;
  const extraDeck = props.extraDeck?.length;
  return (
    <>
      <div className={`w-7/8${Container} max-w-[620px] sm:max-sm:m-auto`}>
        {/*Character and Skill Section*/}
        {props.skill && (
          <>
            <div className="grid grid-cols-6 grid-rows-5 w-full p-3 pb-0">
              <div className="col-start-1 row-start-1 col-span-1 row-span-4">
                <FallbackImage
                  src={`/img/characters/${props.skill.character}.png`}
                  fallback="/img/characters/UnknownCharater.png"
                  alt="Character"
                  width={100}
                  height={100}
                ></FallbackImage>
              </div>
              <div className="col-start-2 row-start-1 col-span-2 row-span-4 text-xs">
                <p>Main Deck:{mainDeck}</p>
                {extraDeck && <p>Extra Deck:{extraDeck}</p>}
                {sideDeck && <p>Side Deck:{sideDeck}</p>}
              </div>
              <div className="col-start-1 row-start-5 col-span-6 row-span-1 flex justify-center items-end">
                <div className="flex items-center justify-center gap-1">
                  <FallbackImage className="w-7 h-7" src="/img/icons/skill.png" fallback="/img/icons/skill.png" alt="Skill" width={100} height={100} />
                  <Skill {...props.skill} format={props.format} />
                </div>
              </div>
              <div className="col-end-7 row-start-1 col-span-3 row-span-4 hidden md:flex justify-end items-start">
                <div className="flex flex-wrap justify-end items-end w-[70%]">
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
                      <div className="grid grid-cols-10">
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
                <div className="w-1/5 p-[0.2em] md:w-1/6 lg:w-[10%]" key={index}>
                  <YugiohCard card={e} rarity={"UR"} format={props.format} />
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
                    <div className="w-[12.5%] lg:w-[10%] p-[0.2em]" key={index}>
                      <YugiohCard card={e} rarity={"UR"} format={props.format} />
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
                    <div className="w-[12.5%] lg:w-[10%] p-[0.2em]" key={index}>
                      <YugiohCard card={e} rarity={"UR"} format={props.format} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
