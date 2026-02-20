import { useState } from "react";

const MessageInput = ({ onSend, loading }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#202020] rounded-3xl h-full px-[2%] w-[70%] flex items-center"
    >
      <div className="w-full h-[70%] flex justify-between gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything ..."
          className="flex-1 bg-[#202020] px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading} hidden={!message}
          className="bg-red-500 hover:bg-red-700 cursor-pointer w-[10%] rounded-full disabled:opacity-50 hover:pl-2 transition-all ease-in"
        >
          <svg className="text-white bi bi-arrow-right-short m-auto w-[50%] h-full " fillRule="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;