import { HTMLProps } from "react";

export const DlContainer = (props: HTMLProps<HTMLDivElement>) => {
  return (
    <div className="border-4 speed-deck-border text-blue-100 bg-gradient-to-l from-black via-[#0d2235] to-black w-fit h-auto">
      <div className="bg-cover w-full" style={{ backgroundImage: "url('/img/bg/dl_background_layer.png')" }}>
        <div {...props}></div>
      </div>
    </div>
  );
};
