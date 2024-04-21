"use client";
import { ReactNode, useState } from "react";
type TabsType = {
  title: string;
  element: ReactNode;
}[];
interface TabsProps {
  data: TabsType;
}
export default (props: TabsProps) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  return (
    <div>
      <ul className="flex font-roboto cursor-pointer flex-wrap focus:outline-none">
        {props.data.map((element, index) => (
          <li
            key={index}
            onClick={(e) => {
              setCurrentTab(index);
            }}
            className={`px-3 py-2 border-b-2 ${
              index == currentTab ? " border-blue-500 text-blue-500" : "border-b-white text-white hover:border-b-blue-200 hover:text-blue-200"
            }`}
          >
            {element.title}
          </li>
        ))}
      </ul>
      <div className="w-full mt-10">
        {props.data.map((element, index) => (
          <div className={`${index != currentTab && "hidden"}`} key={index}>
            {element.element}
          </div>
        ))}
      </div>
    </div>
  );
};
