"use client";
import React, { useState } from "react";
import Markdown from "./MarkdownEditor";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(
    `# markdown preview
## markdown preview
### markdown preview
#### markdown preview
##### markdown preview
###### markdown preview
markdown preview

This is a paragraph with a custom syntax: {@test:123}
`
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  const getRows = () => {
    return (markdown.match(/\n/g) || []).length + 1;
  };

  return (
    <div className="markdown-editor flex gap-10">
      <textarea
        value={markdown}
        onChange={handleInputChange}
        className="text-black w-1/2 resize-none h-auto"
        placeholder="Write your markdown here"
        rows={getRows()}
        style={{ resize: "none", minHeight: "50px" }}
      />
      <div className="markdown">
        <Markdown>{markdown}</Markdown> {/* Pass state as prop */}
      </div>
    </div>
  );
};

export default MarkdownEditor;
