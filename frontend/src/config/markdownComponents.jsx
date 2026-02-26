import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const markdownComponents = {
  // Code block with syntax highlighting
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <div className="w-[calc(100%+2rem)] -mx-4 my-2 rounded-lg overflow-x-auto">
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-gray-700 px-2 py-1 rounded text-sm" {...props}>
        {children}
      </code>
    );
  },
  // Improved list styling
  ul({ children }) {
    return <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>;
  },
  li({ children }) {
    return <li className="ml-2">{children}</li>;
  },
  // Table styling
  table({ children }) {
    return (
      <table className="border-collapse border border-gray-600 my-2 text-sm">
        {children}
      </table>
    );
  },
  th({ children }) {
    return <th className="border border-gray-600 px-3 py-2 bg-gray-700">{children}</th>;
  },
  td({ children }) {
    return <td className="border border-gray-600 px-3 py-2">{children}</td>;
  },
  // Blockquote styling
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-red-500 pl-4 italic my-2 text-gray-300">
        {children}
      </blockquote>
    );
  },
  // Link styling
  a({ children, href }) {
    return (
      <a href={href} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
  // Heading styling
  h1({ children }) {
    return <h1 className="text-xl font-bold my-2">{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="text-lg font-bold my-2">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="text-base font-bold my-1">{children}</h3>;
  },
  // Paragraph styling
  p({ children }) {
    return <p className="my-2">{children}</p>;
  },
};
