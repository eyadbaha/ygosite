import { HTMLProps } from "react";

export const MasterContainer = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div className="border-4 border-double border-[#7A7C7F] text-blue-100 bg-gradient-to-l from-black via-[#0d2235] to-black w-fit h-auto">
      <div className="bg-cover w-fit master-duel-screen-texture relative">
        <div {...props}></div>
      </div>
    </div>
  );
};
