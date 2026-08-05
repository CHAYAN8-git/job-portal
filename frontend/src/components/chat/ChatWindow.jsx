import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import socket from "../../services/socket";

import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

function ChatWindow({

    conversation,
    conversations,
    setConversations,

}) {

    const { user, onlineUsers } = useAuth();

    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {

        if (conversation) {

            fetchMessages();

        }

    }, [conversation]);

    useEffect(() => {

        function handleReceiveMessage(message) {

            const incomingConversationId = String(
                typeof message.conversation === "object"
                    ? message.conversation._id
                    : message.conversation
            );

            const currentConversationId = String(
                conversation?._id
            );

            if (incomingConversationId === currentConversationId) {

                setMessages(prev => [...prev, message]);

                setConversations(prev => {

                    const updated = prev.map(item => {

                        if (item._id === incomingConversationId) {

                            return {

                                ...item,
                                lastMessage: message.text,
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

            }

        }

        function handleTyping() {

            setIsTyping(true);

        }

        function handleStopTyping() {

            setIsTyping(false);

        }

        socket.on("receive-message", handleReceiveMessage);

        socket.on("user-typing", handleTyping);

        socket.on("user-stop-typing", handleStopTyping);

        return () => {

            socket.off("receive-message", handleReceiveMessage);

            socket.off("user-typing", handleTyping);

            socket.off("user-stop-typing", handleStopTyping);

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

                        {isOnline && (
                            <span className="online-dot"></span>
                        )}

                    </div>

                    <div>

                        <h3>{otherUser?.fullName}</h3>

                        <p>

                            {isTyping
                                ? "✍️ Typing..."
                                : isOnline
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
                conversations={conversations}
                setConversations={setConversations}
            />

        </div>

    );

}

export default ChatWindow;