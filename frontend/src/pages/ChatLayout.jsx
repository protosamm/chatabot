import { useParams, useNavigate } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';
import MessageBubble from '../components/MessageBubble';
import SideBar from '../components/SideBar';
import MessageInput from '../components/MessageInput';
import API from '../services/api';
import { useState } from 'react';

function ChatLayout() {
  const { conversationId } = useParams();
  const navigate = useNavigate();

  const [sidebarRefresh, setSidebarRefresh] = useState(0);
  const [messagesRefresh, setMessagesRefresh] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message) => {
    try {
      setLoading(true);

      const { data } = await API.post("/chat/send", {
        conversationId: conversationId || null,
        message,
      });

      setMessagesRefresh(prev => prev + 1);

      // If new conversation created, redirect
      if (!conversationId) {
        setSidebarRefresh(prev => prev+1)
        navigate(`/chat/${data.conversationId}`);
      }

    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen flex flex-row  text-white bg-[#101010]'>
      <div className='w-[20%]'>
        <SideBar refreshTrigger={sidebarRefresh} />
      </div>
      <div className='main-content  flex-1 h-full flex flex-col gap-3 p-[1%]'>
        <div className='flex-1 overflow-y-auto'>
          {conversationId ? (
            <ChatWindow conversationId={conversationId} messagesRefresh={messagesRefresh} />
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