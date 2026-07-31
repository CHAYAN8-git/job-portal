const Conversation = require("../models/Conversation");

const createConversation = async (req, res) => {
    try {

        const { receiverId } = req.body;

        // Don't allow chatting with yourself
        if (receiverId === req.user.userId) {
            return res.status(400).json({
                message: "You cannot start a conversation with yourself.",
            });
        }

        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            participants: {
                $all: [req.user.userId, receiverId],
            },
        });

        // If not found, create a new one
        if (!conversation) {

            conversation = await Conversation.create({
                participants: [
                    req.user.userId,
                    receiverId,
                ],
            });

        }

        res.status(200).json(conversation);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

const getMyConversations = async (req, res) => {
    try {

        const conversations = await Conversation.find({
            participants: req.user.userId,
        })
            .populate("participants", "-password")
            .sort({ updatedAt: -1 });

        res.status(200).json(conversations);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
    createConversation,
    getMyConversations,
};