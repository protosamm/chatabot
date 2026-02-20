import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../contexts/AuthContexts'
import API from "../services/api";
import { useEffect, useState } from "react";

function SideBar({refreshTrigger}) {
  const navigate = useNavigate();

  const { user, userLoading, signOut } = useAuth();

  const { conversationId } = useParams();

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConversations = async ()=>{
    try {
      setLoading(true);
      const { data } = await API.get("/chat/conversations");
      setConversations(data.conversations);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  } 

  useEffect(()=>{
    fetchConversations();
  },[refreshTrigger]);

  const handleSignOut =()=>{
    signOut();
    navigate("/login");
  }

  return (
    <div className=' text-[1rem] font-medium h-full w-full bg-[#171717] flex flex-col'>
      <div className=' new-chat border-b border-b-[#404040] h-[20%] flex justify-center items-center'>
        <button onClick={()=>navigate("/")} className='w-[80%] bg-[#202020] h-[40%] hover:bg-[#303030] cursor-pointer'>+ New Chat</button>
      </div>
      <div className='all-chats overflow-y-auto flex-1 flex flex-col px-2 gap-2 pt-5'>
         {loading && (
          <p className="text-gray-500 text-sm">Loading...</p>
        )}

        {!loading && conversations.length === 0 && (
          <p className="text-gray-500 text-sm">
            No conversations yet
          </p>
        )}

        {conversations.map((chat) => (
          <div
            key={chat._id}
            onClick={() => navigate(`/chat/${chat._id}`)}
            className={`py-2 px-4 rounded-full cursor-pointer text-sm truncate
              ${
                conversationId === chat._id
                  ? "bg-red-500 hover:bg-red-900"
                  : "bg-[#171717] hover:bg-[#202020]"
              }`}
          >
            {chat.title}
          </div>
        ))}
      </div>
      <div className="h-[20%] border-t border-t-[#404040]">
        <div className="flex flex-col items-center h-full w-full gap-2">
          <div className=" px-3 text-sm font-medium mt-4 border-b border-b-[#505050]">
            {loading?"Loading":user?.name}
          </div>

          <button
            onClick={handleSignOut}
            className=" h-[30%] w-[60%] text-xs bg-red-600 hover:bg-red-500 px-3 py-1 rounded-b-xl cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar