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
              : "text-gray-100"
          }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;