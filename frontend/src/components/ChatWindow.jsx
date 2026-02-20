import MessageBubble from "./MessageBubble"
import API from "../services/api"
import { useEffect, useRef, useState } from "react"


function ChatWindow({ conversationId, messagesRefresh }) {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(()=>{
    const fetchMessages = async ()=>{
      try {
        setLoading(true);

        const { data } = await API.get(`/chat/messages/${conversationId}`);

        setMessages(data.messages);
        

      } catch(error){
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if(conversationId){
      fetchMessages();
    }
  }, [conversationId, messagesRefresh]);

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({ behavior: "smooth"});
  }, [messages])

  return (
    <div className='relative font-medium w-full flex-1 flex flex-col items-center gap-5'>
      <div className="flex-1 w-[80%] space-y-10">
        {loading && (
          <p className="text-gray-500 text-sm">Loading messages...</p>
        )}

        {!loading && messages.length === 0 && (
          <p className="text-gray-500 text-sm">
            No messages yet
          </p>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}

export default ChatWindow