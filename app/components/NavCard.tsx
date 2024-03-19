import Link from "next/link";
import Image from "next/image";

type navCardProps = {
  title: string;
  subText: string;
  imgSrc: string;
  link: string;
  pc?: boolean;
};
const IMAGE_SERVER = process.env.NEXT_PUBLIC_IMAGE_SERVER;
export default (props: navCardProps) => {
  return (
    <>
      <Link href={props.link} className={`${props.pc && "hidden lg:block"}`}>
        <div className="aspect-[9/5] overflow-hidden flex hover:scale-105 transition-all duration-300 inner-border">
          <Image
            src={`https://wsrv.nl/?url=${IMAGE_SERVER}${props.imgSrc}&w=305&h=170&fit=cover&a=top&q=75&output=webp`}
            alt={props.title}
            width={305}
            height={170}
            quality={70}
            loading="eager"
            className="object-cover object-top w-full h-full min-w-full min-h-full self-start"
          />
          <div className="absolute w-full py-2 h-content bottom-0 bg-black/50">
            <p style={{ textShadow: "2px 2px 2px black" }} className="text-title text-responsive-2 px-2 truncate">
              {props.title}
            </p>
            <p className="relative px-2 text-white text-responsive-2">{props.subText}</p>
          </div>
        </div>
      </Link>
    </>
  );
};
