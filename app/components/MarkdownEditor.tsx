"use client";
import ReactMarkdown from "react-markdown";

const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
        p(props) {
          const { children, className, node, ...rest } = props;
          // Optional custom rendering logic for specific elements (server-side)
          console.log(/<card\s(\d+)>/.test(children?.toString() || ""));
          return <div>p</div>;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
