const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const sendMessage = async (req, res) => {
    try {

        const { conversationId, text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "Message cannot be empty",
            });
        }

        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({
                message: "Conversation not found",
            });
        }

        if (!conversation.participants.includes(req.user.userId)) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        const message = await Message.create({
            conversation: conversationId,
            sender: req.user.userId,
            text,
        });

        conversation.lastMessage = text;
        conversation.lastMessageSender = req.user.userId;
        conversation.updatedAt = new Date();
        conversation.unreadCount += 1;

        await conversation.save();

        const populatedMessage = await Message.findById(message._id)
            .populate("sender", "fullName profilePhoto");

        const io = req.app.get("io");

        console.log("\n========== SEND MESSAGE ==========");
        console.log("Conversation ID:", conversation._id.toString());
        console.log("Sender:", req.user.userId);
        console.log("Participants:", conversation.participants);
        console.log("Conversation Field:", populatedMessage.conversation);
        console.log("=================================\n");

        conversation.participants.forEach((participant) => {

            console.log("Checking:", participant.toString());

            if (participant.toString() !== req.user.userId) {

                console.log("✅ Emitting to:", participant.toString());

                io.to(participant.toString()).emit(
                    "receive-message",
                    populatedMessage
                );

            }

        });

        res.status(201).json(populatedMessage);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });

    }
};

const getMessages = async (req, res) => {

    try {

        const conversation = await Conversation.findById(req.params.id);

        if (!conversation) {
            return res.status(404).json({
                message: "Conversation not found",
            });
        }

        if (!conversation.participants.includes(req.user.userId)) {
            return res.status(403).json({
                message: "Unauthorized",
            });
        }

        const messages = await Message.find({
            conversation: req.params.id,
        })
            .populate("sender", "fullName profilePhoto")
            .sort({ createdAt: 1 });

        res.status(200).json(messages);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });

    }

};
const markConversationSeen = async (req, res) => {

    try {

        const { conversationId } = req.params;

        await Message.updateMany(
            {
                conversation: conversationId,
                sender: {
                    $ne: req.user.userId,
                },
                seen: false,
            },
            {
                seen: true,
                seenAt: new Date(),
            }
        );

        const conversation = await Conversation.findById(
            conversationId
        );

        conversation.unreadCount = 0;

        await conversation.save();

        const io = req.app.get("io");

        conversation.participants.forEach((participant) => {

            if (participant.toString() !== req.user.userId) {

                io.to(participant.toString()).emit(
                    "messages-seen",
                    {
                        conversationId,
                    }
                );

            }

        });

        res.status(200).json({
            message: "Conversation marked as seen",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });

    }

};
module.exports = {
    sendMessage,
    getMessages,
    markConversationSeen,
};