"use client";
import Link from "next/link";
import Image from "next/image";

type MainListSectionContent = {
  text: string;
  tag: "tcg" | "ocg" | "md" | "dl" | "sp" | "rd";
  time: string | JSX.Element;
  link: string;
};

type MainListSectionProps = {
  title: string;
  list?: MainListSectionContent[];
  viewMoreLink?: string;
};
export default (props: MainListSectionProps) => {
  return (
    <div className="flex flex-col gap-3 md:w-[30%] xl:w-auto text-black">
      <div className="border-black text-title text-responsive-2">| {props.title}</div>
      <ul className="border-[#c77dff] border-2 shadow-purple limit-5">
        {props.list?.map((content, index) => (
          <Link href={content.link} className="group" key={index}>
            <li className="h-14 flex items-center bg-zinc-200 hover:bg-zinc-300 border-b-black border-b-[1px] group-last:border-0">
              <Image
                src={`/img/icons/${content.tag}.png`}
                alt={content.tag}
                width={100}
                height={100}
                quality={100}
                className="h-auto w-1/6 p-1"
              />
              <div className="w-4/5">
                <p className="font-medium text-base 2xl:text-lg truncate">{content.text}</p>
                <p>
                  <i className="fas fa-clock mr-1"></i>
                  {content.time}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      {props.viewMoreLink && (
        <Link href={props.viewMoreLink}>
          <p className="text-sky-600 hover:text-sky-500 font-roboto font-semibold">View More</p>
        </Link>
      )}
    </div>
  );
};
