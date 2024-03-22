import Link from "next/link";
import Image from "next/image";

type tagsType = "tcg" | "ocg" | "md" | "dl" | "sp" | "rd";
type PostCardProps = {
  title: string;
  time: string;
  imgSrc: string;
  link: string;
  tags?: tagsType[];
};
const IMAGE_SERVER = process.env.NEXT_PUBLIC_IMAGE_SERVER;
export default (props: PostCardProps) => {
  return (
    <>
      <Link href={props.link}>
        <div className="relative bg-slate-800 transition duration-1000 hover:bg-slate-500 hover:-translate-y-1 min-h-full">
          <div className="relative w-full h-2/3">
            <div className="absolute grid grid-cols-4 w-full h-full gap-1 p-2 ">
              {props.tags?.map((tag) => (
                <div key={tag}>
                  <Image src={`/img/icons/${tag}.webp`} alt={tag} width={95} height={45} quality={75} loading="eager" />
                </div>
              ))}
            </div>
            <Image
              src={`https://wsrv.nl/?url=${IMAGE_SERVER}${props.imgSrc}&w=408&h=204&fit=cover&a=top&q=75&output=webp`}
              alt={props.title}
              width={408}
              height={204}
              loading="eager"
              className="object-cover object-top self-start aspect-[2/1]"
            />
          </div>
          <div className="p-2">
            <p className="text-slate-200 text-responsive-2">
              <i aria-hidden className="fas fa-clock mr-1"></i>
              {props.time}
            </p>
            <p className="text-title text-responsive-2 text-slate-300">{props.title}</p>
          </div>
        </div>
      </Link>
    </>
  );
};
