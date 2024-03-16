"use client";

import Link from "next/link";
import { useRef, MouseEvent, useEffect } from "react";

const navbarList = [
  {
    name: "SPEED Report Example",
    link: "/speed",
  },
  {
    name: "RUSH Report Example",
    link: "/rush",
  },
];
export default (props: { avatar: { avatar: string; link: string } }) => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);
  const toggleNavbar = (e: MouseEvent<SVGSVGElement | HTMLDivElement>) => {
    blurRef.current?.classList.toggle("opacity-100");
    blurRef.current?.classList.toggle("opacity-0");
    blurRef.current?.classList.toggle("scale-0");
    navbarRef.current?.classList.toggle("translate-x-[-100%]");
  };
  const NavButtons = () => {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#212020"
          width="50"
          height="50"
          viewBox="-1 0 19 19"
          className="cursor-pointer"
          onClick={(e) => toggleNavbar(e)}
          //style={{ filter: 'drop-shadow(0px 0px 5px #bfff00' }}
        >
          <rect width="50" height="50" fill="none" />
          <path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-2.967-3.47a.792.792 0 0 0-.792-.792H4.342a.792.792 0 1 0 0 1.583h8.316a.792.792 0 0 0 .792-.791zm0 3.487a.792.792 0 0 0-.792-.791H4.342a.792.792 0 1 0 0 1.583h8.316a.792.792 0 0 0 .792-.792zm0 3.487a.792.792 0 0 0-.792-.791H4.342a.792.792 0 1 0 0 1.583h8.316a.792.792 0 0 0 .792-.792z" />
        </svg>
        <Link href={"/"}>
          <img src="/img/logo.svg" className="h-[45px] w-auto" />
        </Link>
      </>
    );
  };
  return (
    <>
      <div className="top-0 left-0 fixed w-full h-[60px] bg-black flex gap-[1em] items-center pl-4 z-[2]">
        <NavButtons />
        <div className="h-full w-24 absolute right-0 flex items-center">
          <a href={props.avatar.link} className="relative h-[80%] my-auto w-full cursor-pointer flex items-center justify-center">
            <div
              style={{
                backgroundImage: `url('${props.avatar.avatar}')`,
              }}
              className="h-[87%] absolute hexagon bg-cover bg-center  bg-no-repeat"
            />
            <img src="/img/avatar-frames/link.png" className="h-full absolute" />
          </a>
        </div>
      </div>
      <div
        className="fixed w-screen h-screen top-0 left-0 backdrop-blur-sm transition-opacity scale-0 duration-500 opacity-0 z-[2]"
        ref={blurRef}
        onClick={(e) => toggleNavbar(e)}
      />
      <div
        ref={navbarRef}
        className="flex flex-col fixed transition duration-300 translate-x-[-100%] top-0 left-0 w-full lg:w-[650px] h-screen bg-gradient-to-r from-[#081f30] to-[#05090f] z-[2]"
      >
        <div className="h-full master-duel-screen-texture">
          <div className="flex h-[60px] gap-[1em] items-center pl-4">
            <NavButtons />
          </div>
          <ul className="w-4/5">
            {navbarList.map((navItem) => (
              <Link href={navItem.link} key={navItem.name}>
                <li className="box-border text-white text-[14px] font-[500] bg-[#173446] border-l-[3px] border-md-lime place-self-center p-3 mx-5 my-3 hover:shadow-md-box hover:border-[3px] hover:py-[0.625em] hover:animate-border-pulse">
                  {navItem.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
