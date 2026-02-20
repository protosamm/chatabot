const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');
const generateResponse = require('../utils/gemini.utils');


const getUserConversation = async (req, res)=>{
    try {
        const conversations = await Conversation.find({
            userId: req.user.id
        })
        .select("_id title createdAt updatedAt")
        .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            count: conversations.length,
            conversations
        })

    } catch(error) {
        return res.status(500).json({message: error.message, success: false});
    }
}

const getMessages = async (req, res)=>{
    try{
        const { conversationId } = req.params;

        const conversation = await Conversation.findOne({
            _id: conversationId,
            userId: req.user.id
        });

        if(!conversation){
            return res.status(404).json({
                success: false,
                message: "Conversation not found"
            });
        }

        const messages = await Message.find({
            conversationId
        }).sort({ createdAt: 1});

        return res.status(200).json({
            success: true,
            count: messages.length,
            messages
        })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const sendMessage = async (req, res)=>{
    try{
        const {conversationId, message} = req.body;

        let conversation;

        if(!conversationId){
            conversation = await Conversation.create({
                userId: req.user.id,
                title: "New Chat",
            });
        } else {
            conversation = await Conversation.findById(conversationId);
            if(!conversation){
                return res.status(404).json({ message: "Conversation not found"});
            }
        }

        const userMessage = await Message.create({
            conversationId: conversation._id,
            role: "user",
            content: message,
        })

        const messages = await Message.find({
            conversationId: conversation._id,
        }).sort({ createdAt: 1});

        const aiReply = await generateResponse(messages);

        const aiMessage = await Message.create({
            conversationId: conversation._id,
            role: "model",
            content: aiReply
        })

        res.json({
            conversationId: conversation._id,
            userMessage,
            aiMessage,
        });

    } catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = { sendMessage, getUserConversation, getMessages };