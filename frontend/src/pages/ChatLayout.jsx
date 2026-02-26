import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import SideBar from '../components/SideBar';
import MessageInput from '../components/MessageInput';
import API from '../services/api';

function ChatLayout() {
  const { conversationId } = useParams();
  const navigate = useNavigate();

  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState("");

  const [conversations, setConversations] = useState([]);
  const [sidebarLoading, setSidebarLoading] = useState(false);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message) => {
    try {
      setLoading(true);

      const tempUserMessage = {
        _id: Date.now(),
        role: "user",
        content: message,
      }

      setMessages(prev => [...prev, tempUserMessage])
      
      const { data } = await API.post("/chat/send", {
        conversationId: conversationId || null,
        message,
      });
      
      setMessages(prev => [...prev, data.aiMessage]);

      // If new conversation created, redirect
      if (!conversationId) {
        setConversations(prev => [ { _id: data.conversationId, title: "New Chat" }, ...prev]);
        navigate(`/chat/${data.conversationId}`);
      }

    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const fetchConversations = async ()=>{
      try{
        setSidebarLoading(true);
        const { data } = await API.get("/chat/conversations");
        setConversations(data.conversations);
      } catch(error){
        console.error(err.response?.data || error.message);
      } finally {
        setSidebarLoading(false);
      }
    };

    fetchConversations();
    
  }, []);

  const handleTitleUpdate = async ()=>{
    try {
      await API.patch(`/chat/messages/${conversationId}`, {
        title: titleInput,
      });
      setConversations(prev => prev.map(c => c._id === conversationId ? {...c, title: titleInput} : c));
      setEditingTitle(false);
    } catch(error){
      console.error(error.response?.data || error.message);
    }
  };

  const handleDeleteConversation = async (id)=>{
    try {
      await API.delete(`/chat/messages/${id}`);
      setConversations(prev => prev.filter(c => c._id !== id));

      if (id === conversationId) {
        navigate("/");
        setMessages([]);
      }

    } catch(error){
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(()=>{
    if (!conversationId) return;

    const currentConversation = conversations.find(c => c._id === conversationId);
    if(currentConversation){
      setTitleInput(currentConversation?.title || "New Chat");
    }
  }, [conversationId, conversations]);

  return (
    <div className='h-screen flex flex-row  text-white bg-[#101010]'>
      <div className='w-[20%]'>
        <SideBar 
          conversations={conversations} 
          setConversations={setConversations} 
          sidebarLoading={sidebarLoading} 
          onDeleteConversation={handleDeleteConversation}
        />
      </div>
      <div className='main-content  flex-1 h-full flex flex-col gap-3 p-[1%]'>
        
        <div className='h-[8%] w-full flex items-center justify-between px-5'>
          <div className='chatabot-logo h-full font-medium text-2xl hover:tracking-wide transition-all cursor-default '>
            chat<span className="text-red-500 hover:text-green-400 transition-all cursor-default">A</span>bot
          </div>
          
          <div className='chat-title flex flex-1 gap-5 h-full font-medium text-sm text-gray-500'>
            {conversationId ? (
              <>
                <input
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleTitleUpdate();
                  }}
                  onFocus={() => setEditingTitle(true)}
                  onBlur={() => !titleInput && setEditingTitle(false)}
                  autoFocus={editingTitle}
                  className={`
                    flex-1 text-xl text-right font-semibold bg-transparent border-none px-0 py-0 text-white cursor-text focus:outline-none underline decoration-1 underline-offset-4 decoration-[#404040]
                  `}
                />

                {editingTitle && (
                  <button
                    onClick={handleTitleUpdate}
                    className=" text-white cursor-pointer px-2 py-1 bg-red-500 rounded hover:bg-green-500"
                  >
                    Save
                  </button>
                )}
              </>
            ) : (
              <div className=""></div>
            )}
          </div>
        </div>

        <div className='flex-1 overflow-y-auto'>
          {conversationId ? (
            <ChatWindow conversationId={conversationId} messages={messages} setMessages={setMessages} />
          ) : (
            <div className='bg-[#202020] rounded-2xl w-full h-full flex justify-center items-center'>
              Start a new Conversation
            </div>
          )}
        </div>
        <div className='h-[10%] w-full flex justify-center'>
          <MessageInput onSend={handleSendMessage} loading={loading} className='' />
        </div>
      </div>


    </div>
  )
}

export default ChatLayout