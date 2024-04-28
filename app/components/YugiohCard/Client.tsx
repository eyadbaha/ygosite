"use client";
import Image from "next/image";
import { useModalContext } from "../../context/modal";
import FallbackImage from "../FallbackImage";
import { YugiohCardType } from "@/app/types/YugiohCard";
import Link from "next/link";
import { convertTextToHTML } from "@/app/utils/convertTextToHTML";

export interface YugiohCardProps {
  art?: number;
  rarity?: "UR" | "SR" | "R" | "N";
  limit?: 1 | 2 | 3;
  disableModal?: boolean;
  format: "RUSH" | "SPEED" | "MASTER" | "OCG";
  card: YugiohCardType;
  inline?: boolean;
}
const IMAGE_SERVER = process.env.NEXT_PUBLIC_IMAGE_SERVER;

const Clickable = (props: YugiohCardProps) => {
  const modalContext = useModalContext();
  const card = props.card;
  let Container: string;
  if (props.format == "RUSH") {
    Container = " dl-rush-container";
  } else if (props.format == "SPEED") {
    Container = " dl-speed-container";
  } else {
    Container = " md-container";
  }
  const art = props.art == 1 || !props.art ? `${IMAGE_SERVER}/cards/${card.id}.webp` : `${IMAGE_SERVER}/cards/${card.id}_${props.art}.webp`;
  const handleClick = () => {
    modalContext.setModalContent({
      visible: true,
      content: (
        <div className={`w-full max-w-[800px] min-h-[200px] md:min-h-[500px] grid grid-cols-3 p-4 content-center gap-4${Container}`}>
          <div className="h-full flex flex-col col-span-1 place-content-center">
            {props.rarity && props.format != "OCG" && (
              <FallbackImage
                className={props.format == "MASTER" ? "self-end w-1/5" : "self-end w-1/3"}
                src={`/img/icons/${props.format == "MASTER" ? "md_l" : "dl"}/${props.rarity}.png`}
                fallback={`/img/icons/UR.png`}
                alt=""
                width={50}
                height={50}
              />
            )}
            <div className="relative">
              {props.limit && (
                <Image
                  src={`/img/icons/limit${props.limit}.svg`}
                  alt={`Limit ${props.limit}`}
                  width={50}
                  height={50}
                  className="absolute right-0 w-1/5 h-auto"
                />
              )}
              <FallbackImage src={art} fallback="/img/card-back.webp" alt="" width={300} height={300} />
            </div>
          </div>
          <div className="col-span-2 h-full font-KafuTechnoStd text-slate-300 text-responsive-2">
            <div className="grid grid-cols-4 grid-rows-[repeat(10,minmax(0,1fr))] h-full">
              <div className="col-start-1 col-span-4">
                <span className="text-center">{card.name}</span>
              </div>
              {"atk" in card && <span className="col-span-2">Attribute: {card.attribute}</span>}
              {"level" in card && "def" in card && (
                <>
                  <span className="col-span-2">Level: {card.level}</span>
                </>
              )}
              <span className="col-span-2">{`[${card.types.join("/")}]`}</span>
              {"legend" in card && card.legend && <span className="col-span-2 text-orange-400">LEGEND</span>}
              <span className="font-roboto col-span-4 row-span-6 sm:max-md:text-xs" dangerouslySetInnerHTML={{ __html: convertTextToHTML(card.desc) }}></span>
              <Link href={`/card/${card.id}`} className="col-span-2 col-start-1 justify-self-end self-end w-full text-blue-500">
                More info...
              </Link>
              {"maxAtk" in card && (
                <p className="col-span-1 col-start-2 justify-self-end self-end w-full text-end">MaxATK/{card.maxAtk == -1 ? "?" : card.maxAtk}</p>
              )}
              {"atk" in card && "def" in card ? (
                <>
                  <p className="col-span-1 col-start-3 justify-self-end self-end w-full text-end">ATK/{card.atk == -1 ? "?" : card.atk} </p>
                  <p className="col-span-1 col-start-4 justify-self-end self-end w-full text-end">DEF/{card.def == -1 ? "?" : card.def}</p>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ),
    });
  };
  if (props.inline)
    return (
      <span
        className={props.card.id === 404 ? `text-red-500 cursor-pointer` : `text-blue-500 cursor-pointer`}
        onClick={
          !props.disableModal
            ? (e) => {
                handleClick();
              }
            : () => {}
        }
      >
        {props.card.name}
      </span>
    );
  return (
    <div
      className="w-full h-full absolute top-0 cursor-pointer"
      onClick={
        !props.disableModal
          ? (e) => {
              handleClick();
            }
          : () => {}
      }
    />
  );
};
export default (props: YugiohCardProps) => {
  const card = props.card;
  const art = props.art == 1 || !props.art ? `${IMAGE_SERVER}/cards/${card.id}.webp` : `${IMAGE_SERVER}/cards/${card.id}_${props.art}.webp`;
  return props.inline ? (
    <Clickable {...props} />
  ) : (
    <div className="flex flex-col-reverse relative">
      <div className="relative">
        {props.limit && (
          <Image src={`/img/icons/limit${props.limit}.svg`} alt={`Limit ${props.limit}`} width={50} height={50} className="absolute right-0 w-1/4 h-auto" />
        )}
        <FallbackImage
          src={art}
          fallback={`/img/card-back.webp`}
          alt=""
          width={100} // Default width
          height={100} // Default width
          sizes="(max-width: 400px) 100px, (max-width: 800px) 200px, 300px"
          quality={75}
          className={`${!props.disableModal && "cursor-pointer"} w-full`}
        />
        <Clickable {...props} />
      </div>
      {props.rarity && props.format != "OCG" && (
        <FallbackImage
          className={`${!props.disableModal && "cursor-pointer"} w-1/2 self-end right-0 top-0 ${props.format == "MASTER" && " absolute"}`}
          src={`/img/icons/${props.format == "MASTER" ? "md" : "dl"}/${props.rarity}.png`}
          fallback={`/img/icons/UR.png`}
          alt=""
          width={100} // Default width
          height={100} // Default width
          sizes="(max-width: 400px) 100px, (max-width: 800px) 100px, 100px"
          quality={75}
        />
      )}
    </div>
  );
};
