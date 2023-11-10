import Link from 'next/link'
import Image from 'next/image'

type navCardProps = {
  title: string
  subText: string
  imgSrc: string
  link: string
  pc?: boolean
}
export default (props: navCardProps) => {
  return (
    <>
      <Link href={props.link} className={`${props.pc && 'hidden lg:block'}`}>
        <div className="aspect-[9/5] overflow-hidden flex hover:scale-105 transition-all duration-300 inner-border">
          <Image
            src={props.imgSrc}
            alt={props.title}
            width={512}
            height={512}
            quality={100}
            className="object-cover object-top w-full h-full min-w-full min-h-full self-start"
          />
          <div className="absolute w-full py-2 h-content bottom-0 bg-black/50">
            <p
              style={{ textShadow: '2px 2px 2px black' }}
              className="text-title text-responsive-2 px-2 truncate"
            >
              {props.title}
            </p>
            <p className="relative px-2 text-white text-responsive-2">
              {props.subText}
            </p>
          </div>
        </div>
      </Link>
    </>
  )
}
