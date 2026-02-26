import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../config/markdownComponents";

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-b-2xl rounded-tl-2xl text-[1rem]
          ${
            isUser
              ? "bg-red-800 text-white max-w-xl"
              : "text-gray-100 max-w-2xl"
          }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MessageBubble;