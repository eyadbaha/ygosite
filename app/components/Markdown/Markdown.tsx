import * as prod from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import YugiohCard from "@/app/components/YugiohCard/Client";
import Tabs from "@/app/components/Tabs";
import { Deck } from "@/app/components/Deck";
import { Skill } from "@/app/components/Skill";
import SkillModel from "@/app/models/Skill";
import { getDeck } from "@/app/utils/getDeck";
import User from "@/app/models/User";
import Card from "@/app/models/Card";

function replaceWithComponent() {
  return function transformer(tree: any) {
    visit(tree, "text", (node, index, parent) => {
      // Replace specific HTML elements with custom React components
      if (node.value === node.value.match?.(/({\@[a-z-]+:[\w\s,]+\})/)?.[0]) {
        const newElementNode = {
          type: "element",
          tagName: "CustomParagraphComponent", // Specify the tag name for the new element node
          properties: {}, // Specify any properties for the new element node (e.g., attributes)
          children: [{ type: "text", value: node.value }], // Copy the content of the text node
        };
        // Replace the original text node with the new element node in the parent node's children array
        parent.children.splice(index, 1, newElementNode);
      }
      // Add more replacements as needed
    });
  };
}
const InlineExtention = async (props: { children: string }) => {
  const { children } = props;
  if (children === children.match?.(/({\@[a-z-]+:[\w\s,]+\})/)?.[0]) {
    const match = children.match?.(/\{\@([a-z-]+):([\w\s,]+)\}/);
    if (match) {
      const [value, key, id] = match;
      if (key == "inline-card") {
        const data = await Card.findOne({ id }, { _id: 0 }).lean();
        if (data) return <YugiohCard inline card={data} format="OCG" />;
        return <span className="text-red-500">Card Not Found</span>;
      }
      if (key == "user") {
        const data = await User.findOne({ discordId: id }).lean();
        if (data) return <span className="text-blue-500">{data.name}</span>;
        return <span className="text-red-500">User Not Found</span>;
      }
      if (key == "deck") {
        const data = await getDeck(id);
        if (data) {
          const format = { sd: "SPEED", md: "MASTER", rd: "RUSH", ocg: "OCG" }[data.format] as "SPEED";
          return <Deck {...data} format={format} />;
        }
        return <p className="text-red-500">Invalid Deck</p>;
      }
      if (key == "skill") {
        const data = await SkillModel.findOne({ name: id }, { _id: 0 }).lean();
        if (data) return <Skill inline {...data} format="SPEED" />;
        return <span className="text-red-500">Skill Not Found</span>;
      }
      if (key === "cards") {
        const cards = id.split(",");
        const data = await Promise.all(cards.map((id) => Card.findOne({ id }, { _id: 0 }).lean()));
        return (
          <div key={id} className="w-full flex max-w-[800px] gap-1 flex-wrap">
            {data.map((card) => {
              const data: any = card || {
                id: 404,
                name: "Card not found",
                desc: "Card data couldn't be found in the database.",
                art: 1,
                rarity: "UR",
                types: ["Error"],
                attribute: "DARK",
                legend: false,
              };
              return (
                <div className="w-[10%]">
                  <YugiohCard card={data} format="OCG" />
                </div>
              );
            })}
          </div>
        );
      }
    }
  }
  return <span>{props.children}</span>;
};
const production: any = {
  Fragment: prod.Fragment,
  jsx: prod.jsx,
  jsxs: prod.jsxs,
  components: {
    CustomParagraphComponent: InlineExtention,
    p: "div",
  },
};
const splitTextPlugin = () => {
  return (tree: any) => {
    visit(tree, "text", (node: { value: string }, index, parent) => {
      const regex = /({\@[a-z-]+:[\w\s,]+\})/;
      if (node.value !== node.value.match?.(regex)?.[0]) {
        const words = node.value.split(/({\@[a-z-]+:[\w\s,]+\})/g); // Split text by space
        const newNodes = words.map((word) => ({
          type: "text",
          value: word,
        }));

        // Replace the current text node with the new text nodes
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
};

/**
 * @param {string} text
 * @returns {JSX.Element}
 */
async function processData(text: string) {
  const file = await unified().use(remarkParse).use(splitTextPlugin).use(remarkRehype).use(replaceWithComponent).use(rehypeReact, production).process(text);
  return file.result;
}
async function splitTabs(text: string): Promise<JSX.Element> {
  const tabsRegex = /([\s\S]*?)\{tabs:([\w,\s]*)\}([\s\S]+?)\{tabs-end\}([\s\S]*)/;

  const match = text.match(tabsRegex);
  if (match) {
    const before = match[1];
    const tabs = match[2].split(",");
    const between = match[3];
    const after = match[4];
    const [Before, After] = await Promise.all(
      [before, after].map((text: string) => {
        if (text.match(tabsRegex)) return splitTabs(text);
        return processData(text);
      })
    );
    let Betweens = await Promise.all(between.split("{tabs-split}").map((tab) => splitTabs(tab)));
    const tabsData = tabs.map((title, index) => {
      const element = Betweens[index] || <></>;
      return { title, element };
    });
    return (
      <>
        {Before}
        <Tabs data={tabsData}></Tabs>
        {After}
      </>
    );
  }
  const result = processData(text);
  return result;
}
export default async (props: { text: string }) => {
  const content = await splitTabs(props.text);
  return content;
};
