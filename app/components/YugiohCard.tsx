"use client";
import Image from "next/image";
import { useModalContext } from "../context/modal";
import FallbackImage from "./FallbackImage";
import { convertTextToHTML } from "../utils/convertTextToHTML";
import { RushContainer } from "./RushContainer";
import Link from "next/link";
import { DlContainer } from "./DlContainer";
import { HTMLProps } from "react";

export interface RushCardProps {
  id: number;
  name: string;
  desc: string;
  art?: number;
  type: string[];
  attribute: "DARK" | "LIGHT" | "WIND" | "EARTH" | "FIRE" | "WATER" | "DIVINE" | "SPELL" | "TRAP";
  legend: boolean;
  level?: number;
  atk?: string;
  def?: string;
  rarity?: "UR" | "SR" | "R" | "N";
  limit?: 1 | 2 | 3;
  arts?: number[];
  maxAtk?: string;
  disableModal?: boolean;
  format: "RUSH" | "SPEED" | "MASTER" | "OCG";
}
const IMAGE_SERVER = process.env.NEXT_PUBLIC_IMAGE_SERVER;

export default (props: RushCardProps) => {
  const modalContext = useModalContext();
  let src: string, Container: (props: HTMLProps<HTMLDivElement>) => JSX.Element, infoLink: string;
  if (props.format == "RUSH") {
    src =
      props.art == undefined || props.art == 1
        ? `${IMAGE_SERVER}/cards/rush/${props.id}.webp`
        : `${IMAGE_SERVER}/cards/rush/${props.id}_${props.art}.webp`;
    Container = RushContainer;
    infoLink = `/card/rush/${props.id}`;
  } else {
    src =
      props.art == undefined || props.art == 1
        ? `${IMAGE_SERVER}/cards/ocg/${props.id}.jpg`
        : `${IMAGE_SERVER}/cards/rush/${props.id}_${props.art}.webp`;
    Container = DlContainer;
    infoLink = `/card/${props.id}`;
  }
  return (
    <div className="flex flex-col">
      {props.rarity && (
        <FallbackImage
          className={`${!props.disableModal && "cursor-pointer"} w-1/3 self-end right-0`}
          src={`/img/icons/${props.rarity}.png`}
          fallback={`/img/icons/UR.png`}
          alt=""
          width={100} // Default width
          height={100} // Default width
          sizes="(max-width: 400px) 100px, (max-width: 800px) 100px, 100px"
          quality={75}
        />
      )}
      <div className="relative">
        {props.limit && (
          <Image
            src={`/img/icons/limit${props.limit}.svg`}
            alt={`Limit ${props.limit}`}
            width={50}
            height={50}
            className="absolute right-0 w-1/4 h-auto"
          />
        )}
        <FallbackImage
          src={src}
          fallback={`/img/card-back.webp`}
          alt=""
          width={100} // Default width
          height={100} // Default width
          sizes="(max-width: 400px) 100px, (max-width: 800px) 200px, 300px"
          quality={75}
          className={`${!props.disableModal && "cursor-pointer"} w-full`}
          onClick={
            !props.disableModal
              ? (e) => {
                  modalContext.setModalContent({
                    visible: true,
                    content: (
                      <Container className="w-[800px] min-h-[500px] grid grid-cols-3 p-4 content-center gap-4">
                        <div className="h-full flex flex-col col-span-1 place-content-center">
                          {props.rarity && (
                            <FallbackImage
                              className="self-end w-1/3"
                              src={`/img/icons/${props.rarity}.png`}
                              fallback={`/img/icons/UR.png`}
                              alt=""
                              width={100}
                              height={100}
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
                            <FallbackImage src={src} fallback="/img/card-back.webp" alt="" width={300} height={300} />
                          </div>
                        </div>
                        <div className="col-span-2 h-full font-KafuTechnoStd text-slate-300 text-responsive-2">
                          <div className="grid grid-cols-4 grid-rows-[repeat(10,minmax(0,1fr))] h-full">
                            <div className="col-start-1 col-span-4">
                              <span className="text-center">{props.name}</span>
                            </div>
                            <span className="col-span-2">Attribute: {props.attribute}</span>
                            {props.level && props.atk && props.def && (
                              <>
                                <span className="col-span-2">Level: {props.level}</span>
                              </>
                            )}
                            <span className="col-span-2">{`[${props.type.join("/")}]`}</span>
                            {props.legend && <span className="col-span-2 text-orange-400">LEGEND</span>}
                            <span
                              className="font-roboto col-span-4 row-span-6"
                              dangerouslySetInnerHTML={{ __html: convertTextToHTML(props.desc) }}
                            ></span>
                            <Link
                              href={infoLink}
                              className="col-span-1 col-start-1 justify-self-end self-end w-full text-blue-500"
                            >
                              More info...
                            </Link>
                            {props.maxAtk && (
                              <p className="col-span-1 col-start-2 justify-self-end self-end w-full text-end">
                                MaxATK/{props.maxAtk}
                              </p>
                            )}
                            {props.level && props.atk && props.def && (
                              <>
                                <p className="col-span-1 col-start-3 justify-self-end self-end w-full text-end">
                                  ATK/{props.atk}{" "}
                                </p>
                                <p className="col-span-1 col-start-4 justify-self-end self-end w-full text-end">
                                  DEF/{props.def}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </Container>
                    ),
                  });
                }
              : () => {}
          }
        />
      </div>
    </div>
  );
};
