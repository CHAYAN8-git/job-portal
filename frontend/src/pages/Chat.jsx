import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";

import api from "../services/api";

import "../styles/chat.css";

function Chat() {

    const location = useLocation();

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    useEffect(() => {

        fetchConversations();

    }, []);

    async function fetchConversations() {

        try {

            const { data } = await api.get("/conversations");

            setConversations(data);

            const params = new URLSearchParams(location.search);

            const conversationId =
                params.get("conversation");

            if (conversationId) {

                const conversation = data.find(
                    c => c._id === conversationId
                );

                if (conversation) {

                    setSelectedConversation(conversation);

                }

            } else if (data.length > 0) {

                setSelectedConversation(data[0]);

            }

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <section className="chat-page">

            <ConversationList
                conversations={conversations}
                selectedConversation={selectedConversation}
                setSelectedConversation={setSelectedConversation}
            />

            <ChatWindow
                conversation={selectedConversation}
            />

        </section>

    );

}

export default Chat;