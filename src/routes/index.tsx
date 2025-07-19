import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download } from "lucide-react";
import MarkdownPreview from "../components/MarkdownPreview";

export const Route = createFileRoute("/")({
  component: EditorPage,
});

function EditorPage() {
  const md = `# Welcome to TanStack Markdown Editor

This is a modern markdown editor built with TanStack Router and React.

## Features

- **Real-time Preview**: See your markdown rendered as you type
- **File Reading**: Read local .md files
- **Download**: Export your markdown as a file
- **Modern UI**: Clean and intuitive interface

## Getting Started

1. Start typing in the editor panel
2. See the preview update in real-time
3. Use the download button to save your work

## Markdown Examples

### Code Blocks
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists
- Item 1
- Item 2
- Item 3

### Links
[TanStack Router](https://tanstack.com/router)

### Images
![Example](https://via.placeholder.com/300x200)

---

*Happy editing!*`;
  const [markdown, setMarkdown] = useState(md);

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <div className="flex-1 flex flex-col border-r border-gray-700">
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Editor</h2>
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
        <textarea
          className="flex-1 w-full p-4 font-mono text-sm text-white bg-gray-900 border-none outline-none resize-none"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Start typing your markdown here..."
        />
      </div>
      <div className="flex-1 flex flex-col bg-gray-900">
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Preview</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <MarkdownPreview markdown={markdown} />
        </div>
      </div>
    </div>
  );
}
