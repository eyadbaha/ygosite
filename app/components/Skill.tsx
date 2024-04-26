"use client";
import { HTMLProps } from "react";
import { useModalContext } from "../context/modal";
import { convertTextToHTML } from "../utils/convertTextToHTML";
import FallbackImage from "./FallbackImage";
import { MouseEvent } from "react";
export type SkillProps = {
  id: number;
  card?: boolean;
  name: string;
  desc: string;
  character: string;
  format: "RUSH" | "SPEED" | "MASTER" | "OCG";
  inline?: boolean;
};

export const Skill = (props: SkillProps) => {
  const modalContext = useModalContext();
  const handleClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) =>
    modalContext.setModalContent({
      visible: true,
      content: (
        <>
          <div className={`w-[600px] grid grid-cols-5 p-6 content-center gap-4 text-slate-300${Container}`}>
            <FallbackImage
              src={`/img/characters/${props.character}.webp`}
              fallback="/img/characters/UnknownCharater.png"
              alt="Yami Yugi"
              width={100}
              height={100}
              className="w-full"
            ></FallbackImage>
            <div className="col-span-4">
              <p>{props.name}</p>
              <p className="font-roboto pt-4" dangerouslySetInnerHTML={{ __html: convertTextToHTML(props.desc) }}></p>
            </div>
          </div>
        </>
      ),
    });

  let Container: string;
  if (props.format == "RUSH") {
    Container = " dl-rush-container";
  } else {
    Container = " dl-speed-container";
  }
  if (props.inline)
    return (
      <span onClick={handleClick} className="text-blue-500 cursor-pointer">
        {props.name}
      </span>
    );
  return (
    <>
      <div className="text-yellow-400 font-KafuTechnoStd cursor-pointer text-xs" onClick={handleClick}>
        {props.name}
      </div>
    </>
  );
};
