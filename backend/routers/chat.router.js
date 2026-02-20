const router = require("express").Router();
const protect = require('../middlewares/auth.middleware')
const { sendMessage, getUserConversation, getMessages } = require('../controllers/chat.controller');

router.get('/conversations', protect, getUserConversation);
router.get('/messages/:conversationId', protect, getMessages);
router.post('/send', protect, sendMessage);

module.exports = router;