const express = require("express");

const {
    createConversation,
    getMyConversations,
} = require("../controllers/conversationController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createConversation);

router.get("/", auth, getMyConversations);

module.exports = router;