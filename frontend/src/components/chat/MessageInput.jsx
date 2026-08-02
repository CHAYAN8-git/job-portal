import { useState } from "react";
import {
    Smile,
    Paperclip,
    SendHorizontal,
    Mic,
} from "lucide-react";

import api from "../../services/api";

function MessageInput({

    conversation,
    messages,
    setMessages,

}) {

    const [text, setText] = useState("");

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

            // Instantly show message for sender
            setMessages(prev => [...prev, data]);

            setText("");

        } catch (error) {

            console.log(error);

        }

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
                onChange={(e) =>
                    setText(e.target.value)
                }
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