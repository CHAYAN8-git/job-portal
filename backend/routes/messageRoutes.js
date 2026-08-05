const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    sendMessage,
    getMessages,
    markConversationSeen,
} = require("../controllers/messageController");

router.post("/", auth, sendMessage);

router.get("/:id", auth, getMessages);

// Mark all messages in a conversation as seen
router.patch(
    "/:conversationId/seen",
    auth,
    markConversationSeen
);

module.exports = router;