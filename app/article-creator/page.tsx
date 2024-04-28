"use client";
import { useState } from "react";
import MarkdownClient from "../components/Markdown/MarkdownClient";

export default function App() {
  const [text, setText] = useState(
    `## Welcome to the content editor of this site!
{tabs:Duel Links,Master Duel}

This is an example of getting a user: {@user:502367750207832066}\\
This is an example of getting a card as inline text {@inline-card:13082}\\
Getting a skill is the same: {@skill:Storm Access}\\
You can insert a list of full cards like this:{@cards:15150,15164}\\
You can import full decks too, like this: {@deck:662c298a62c91a12a0761b60}
{tabs-split}
Now we are in another tab, let's try getting another card, this time the legendary {@inline-card:4007}.
{tabs-end}`
  );
  const [preview, setPreview] = useState<boolean>(false);
  return (
    <>
      <div onClick={(e) => setText("")} className=" bg-sky-600 cursor-pointer hover:bg-sky-700 select-none inline-block p-2 m-4 ml-0 border-gray-700 border-2">
        Clear
      </div>
      <div
        onClick={(e) => setPreview((prev) => !prev)}
        className=" bg-sky-600 cursor-pointer hover:bg-sky-700 select-none inline-block p-2 m-4 ml-0 border-gray-700 border-2"
      >
        {preview ? "Back to Editor" : "Enable Preview"}
      </div>
      <div className={`flex flex-col gap-20 lg:gap-10${!preview && " h-[140vh] lg:h-[80vh]"} lg:flex-row`}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className={`flex-1 text-black p-1 resize-none ${preview ? " hidden" : ""}`} />
        <div className={`flex-1 border-blue-500 p-1${preview ? "" : " border-2 overflow-y-scroll"}`}>
          <MarkdownClient text={text}></MarkdownClient>
        </div>
      </div>
    </>
  );
}
