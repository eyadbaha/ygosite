"use client";
import ReactMarkdown from "react-markdown";
import { PluggableList, Pluggable } from "react-markdown/lib";
function customSyntaxPlugin(): Pluggable {
  return (tree) => {
    tree.children.forEach((node) => {
      if (node.type === "paragraph") {
        const { children } = node;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.type === "text") {
            // Check if the text contains our custom syntax
            const regex = /{@test:(\d+)}/g;
            let match;
            while ((match = regex.exec(child.value)) !== null) {
              const testNumber = match[1];
              // Replace the custom syntax with a React component node
              const reactNode = {
                type: "element",
                tagName: "span",
                children: [{ type: "text", value: `This is a div with numbers: ${testNumber}` }],
              };
              // Insert the React component node into the AST
              children.splice(i, 1, reactNode);
            }
          }
        }
      }
    });
  };
}
const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        p(props) {
          const { children, className, node, ...rest } = props;
          // Optional custom rendering logic for specific elements (server-side)
          console.log(/<card\s(\d+)>/.test(children?.toString() || ""));
          return <div>{props.children}</div>;
        },
      }}
      remarkPlugins={[customSyntaxPlugin]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
