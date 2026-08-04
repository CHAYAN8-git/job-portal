import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import socket from "../../services/socket";

import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

function ChatWindow({ conversation }) {

const { user, onlineUsers } = useAuth();
    const [messages, setMessages] = useState([]);

    const bottomRef = useRef(null);

    useEffect(() => {

        if (conversation) {
            fetchMessages();
        }

    }, [conversation]);

    useEffect(() => {

        socket.on("receive-message", (message) => {

            const conversationId =
                typeof message.conversation === "object"
                    ? message.conversation._id
                    : message.conversation;

            if (conversationId === conversation?._id) {

                setMessages(prev => [...prev, message]);

            }

        });

        return () => {

            socket.off("receive-message");

        };

    }, [conversation]);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);

    async function fetchMessages() {

        try {

            const { data } = await api.get(
                `/messages/${conversation._id}`
            );

            setMessages(data);

        } catch (error) {

            console.log(error);

        }

    }

    if (!conversation) {

        return (

            <div className="chat-window">

                <div className="empty-chat">

                    <h2>Select a Conversation</h2>

                    <p>Choose a conversation to start chatting.</p>

                </div>

            </div>

        );

    }

    const otherUser = conversation.participants.find(
        participant => participant._id !== user._id
    );
const isOnline =
    onlineUsers.includes(otherUser?._id);
    return (

        <div className="chat-window">

            <div className="chat-header">

                <div className="chat-user">

                    <div className="chat-avatar">

                        {otherUser?.fullName?.charAt(0)}

                        <span className="online-dot"></span>

                    </div>

                    <div>

                        <h3>{otherUser?.fullName}</h3>

<p>

    {isOnline
        ? "🟢 Online"
        : "⚫ Offline"}

</p>
                    </div>

                </div>

                <div className="chat-actions">

                    <div className="chat-action">📞</div>

                    <div className="chat-action">📹</div>

                    <div className="chat-action">⋮</div>

                </div>

            </div>

            <div className="chat-messages">

                {messages.map((message) => (

                    <MessageBubble
                        key={message._id}
                        message={message}
                    />

                ))}

                <div ref={bottomRef}></div>

            </div>

            <MessageInput
                conversation={conversation}
                messages={messages}
                setMessages={setMessages}
            />

        </div>

    );

}

export default ChatWindow;