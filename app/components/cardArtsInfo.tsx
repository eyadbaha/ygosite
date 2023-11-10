"use client";
import { useState } from "react";
import YugiohCard, { RushCardProps } from "./YugiohCard";

type cardArtsInfo = { cardInfo: RushCardProps; format: "RUSH" | "SPEED" };

export const CardArtsInfo = (props: cardArtsInfo) => {
  const cardInfo = props.cardInfo;
  const [cardArt, setCardArt] = useState(1);
  cardInfo.art = cardArt;
  return (
    <>
      <YugiohCard {...{ ...cardInfo, art: cardArt }} disableModal format={props.format} />
      <div className="flex flex-wrap">
        {cardInfo.arts?.map((art) => {
          return (
            <div className="w-1/4 p-1">
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  setCardArt(art);
                }}
              >
                <YugiohCard {...cardInfo} art={art} disableModal rarity={undefined} format={props.format} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
