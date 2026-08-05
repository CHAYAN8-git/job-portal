import { useRef, useState } from "react";
import {
    Smile,
    Paperclip,
    SendHorizontal,
    Mic,
} from "lucide-react";

import api from "../../services/api";
import socket from "../../services/socket";
import { useAuth } from "../../context/AuthContext";

function MessageInput({

    conversation,
    messages,
    setMessages,
    conversations,
    setConversations,

}) {

    const { user } = useAuth();

    const [text, setText] = useState("");

    const typingTimeout = useRef(null);

    const otherUser = conversation.participants.find(
        participant => participant._id !== user._id
    );

    async function sendMessage() {

        if (!text.trim()) return;

        try {

            const { data } = await api.post(
                "/messages",
                {
                    conversationId: conversation._id,
                    text,
                }
            );

            setMessages(prev => [...prev, data]);

            setConversations(prev => {

                const updated = prev.map(item => {

                    if (item._id === conversation._id) {

                        return {

                            ...item,
                            lastMessage: text,
                            updatedAt: new Date().toISOString(),

                        };

                    }

                    return item;

                });

                updated.sort(
                    (a, b) =>
                        new Date(b.updatedAt) -
                        new Date(a.updatedAt)
                );

                return updated;

            });

            socket.emit("stop-typing", {
                receiverId: otherUser._id,
            });

            setText("");

        } catch (error) {

            console.log(error);

        }

    }

    function handleTyping(e) {

        setText(e.target.value);

        socket.emit("typing", {
            receiverId: otherUser._id,
        });

        clearTimeout(typingTimeout.current);

        typingTimeout.current = setTimeout(() => {

            socket.emit("stop-typing", {
                receiverId: otherUser._id,
            });

        }, 1000);

    }

    function handleKeyDown(e) {

        if (e.key === "Enter") {

            sendMessage();

        }

    }

    return (

        <div className="message-input">

            <button
                className="input-icon"
                type="button"
            >
                <Smile size={20} />
            </button>

            <button
                className="input-icon"
                type="button"
            >
                <Paperclip size={20} />
            </button>

            <input
                value={text}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
            />

            <button
                className="input-icon"
                type="button"
            >
                <Mic size={20} />
            </button>

            <button
                className="send-btn"
                type="button"
                onClick={sendMessage}
            >
                <SendHorizontal size={18} />
            </button>

        </div>

    );

}

export default MessageInput;