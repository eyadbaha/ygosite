"use client";
import { Fragment, createElement, useEffect, useState } from "react";
import * as prod from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import YugiohCardClient from "@/app/components/YugiohCard/YugiohCardClient";
import Tabs from "@/app/components/Tabs";
import User from "@/app/components/User/UserClient";
import { DeckClient } from "@/app/components/Deck";
import SkillClient from "@/app/components/SkillClient";

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
const InlineExtention = (props: { children: string }) => {
  const { children } = props;
  if (children === children.match?.(/({\@[a-z-]+:[\w\s,]+\})/)?.[0]) {
    const match = children.match?.(/\{\@([a-z-]+):([\w\s,]+)\}/);
    if (match) {
      const [value, key, id] = match;
      if (key == "inline-card") return <YugiohCardClient inline key={id} id={Number(id)} />;
      if (key == "user") return <User key={id} id={BigInt(id)} />;
      if (key == "deck") return <DeckClient key={id} id={id} />;
      if (key == "skill") return <SkillClient key={id} name={id} />;
      if (key === "cards") {
        const cards = id.split(",");
        return (
          <div key={id} className="w-full flex max-w-[800px] gap-1 flex-wrap">
            {cards.map((card) => (
              <div className="w-[10%]">
                <YugiohCardClient key={id} id={Number(card)} />
              </div>
            ))}
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
export default (props: { text: string }) => {
  const [content, setContent] = useState(createElement(Fragment));

  useEffect(() => {
    let isCancelled = false;

    const update = async () => {
      const content = await splitTabs(props.text);
      if (!isCancelled) {
        setContent(content);
      }
    };

    const debounceUpdate = () => {
      let timeoutId: NodeJS.Timeout;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(update, 300); // Adjust the debounce time as needed
      };
    };

    const delayedUpdate = debounceUpdate();

    delayedUpdate();

    return () => {
      isCancelled = true;
    };
  }, [props.text]);

  return content;
};
