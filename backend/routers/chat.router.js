const router = require("express").Router();
const protect = require('../middlewares/auth.middleware')
const { sendMessage, getUserConversation, getMessages, updateConversationTitle, deleteConversations } = require('../controllers/chat.controller');

router.get('/conversations', protect, getUserConversation);
router.get('/messages/:conversationId', protect, getMessages);
router.patch('/messages/:conversationId', protect, updateConversationTitle);
router.delete('/messages/:conversationId', protect, deleteConversations);
router.post('/send', protect, sendMessage);

module.exports = router;