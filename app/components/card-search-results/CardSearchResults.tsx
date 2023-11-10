import Image from "next/image";
import YugiohCard, { RushCardProps } from "../YugiohCard";
import FallbackImage from "../FallbackImage";
import { RushContainer } from "../RushContainer";
import { HTMLProps } from "react";
import { DlContainer } from "../DlContainer";
import { MasterContainer } from "../MasterContainer";

type RushDeckProps = {
  cards: RushCardProps[];
  format: "OCG" | "MASTER" | "SPEED" | "RUSH";
};

export const CardSearchResults = (props: RushDeckProps) => {
  let Container: (props: HTMLProps<HTMLDivElement>) => JSX.Element;
  if (props.format == "RUSH") {
    Container = RushContainer;
  } else if (props.format == "SPEED") {
    Container = MasterContainer;
  } else {
    Container = DlContainer;
  }
  return (
    <>
      <Container className="w-[620px]">
        <div className="w-full p-3">
          <div className="flex flex-wrap w-full">
            {props.cards.map((e) => {
              return (
                <div className="w-[10%] p-[0.2em]">
                  <YugiohCard {...e} format={props.format} disableModal />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
};
