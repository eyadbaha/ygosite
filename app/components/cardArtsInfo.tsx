"use client";
import { useState } from "react";
import YugiohCard, { YugiohCardProps } from "./YugiohCard/Client";
import { YugiohCardType } from "../types/YugiohCard";

type cardArtsInfo = { cardInfo: YugiohCardType; format: "RUSH" | "SPEED" };

export const CardArtsInfo = (props: cardArtsInfo) => {
  const cardInfo = props.cardInfo;
  const [cardArt, setCardArt] = useState(1);
  return (
    <>
      <YugiohCard card={cardInfo} art={cardArt} disableModal format={props.format} />
      <div className="flex flex-wrap">
        {cardInfo.arts?.map((art) => {
          return (
            <div className="w-1/4 p-1" key={art}>
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  setCardArt(art);
                }}
              >
                <YugiohCard card={cardInfo} art={art} disableModal rarity={undefined} format={props.format} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
