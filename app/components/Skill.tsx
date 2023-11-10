"use client";
import { HTMLProps } from "react";
import { useModalContext } from "../context/modal";
import { convertTextToHTML } from "../utils/convertTextToHTML";
import { DlContainer } from "./DlContainer";
import FallbackImage from "./FallbackImage";
import { RushContainer } from "./RushContainer";

export type SkillProps = {
  id: number;
  card?: boolean;
  name: string;
  desc: string;
  character: string;
  format: "RUSH" | "SPEED" | "MASTER" | "OCG";
};

export const Skill = (props: SkillProps) => {
  const modalContext = useModalContext();
  let Container: (props: HTMLProps<HTMLDivElement>) => JSX.Element;
  if (props.format == "RUSH") {
    Container = RushContainer;
  } else if (props.format == "SPEED") {
    Container = DlContainer;
  } else {
    Container = DlContainer;
  }
  return (
    <>
      <div
        className="text-yellow-400 font-KafuTechnoStd cursor-pointer"
        onClick={(e) =>
          modalContext.setModalContent({
            visible: true,
            content: (
              <>
                <Container className="w-[600px] grid grid-cols-5 p-6 content-center gap-4 text-slate-300">
                  <FallbackImage
                    src={`/img/characters/${props.character}.webp`}
                    fallback="/img/characters/icons/vrains01.png"
                    alt="Yami Yugi"
                    width={100}
                    height={100}
                    className="w-full"
                  ></FallbackImage>
                  <div className="col-span-4">
                    <p>{props.name}</p>
                    <p
                      className="font-roboto pt-4"
                      dangerouslySetInnerHTML={{ __html: convertTextToHTML(props.desc) }}
                    ></p>
                  </div>
                </Container>
              </>
            ),
          })
        }
      >
        {props.name}
      </div>
    </>
  );
};
