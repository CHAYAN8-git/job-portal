import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const messages = [
    {
        id: 1,
        sender: "other",
        text: "Hi 👋",
        time: "10:00 AM",
    },
    {
        id: 2,
        sender: "me",
        text: "Hey Rahul!",
        time: "10:01 AM",
    },
    {
        id: 3,
        sender: "other",
        text: "Thanks for accepting my application.",
        time: "10:02 AM",
    },
    {
        id: 4,
        sender: "me",
        text: "Sure! When are you available for an interview?",
        time: "10:03 AM",
    },
    {
        id: 5,
        sender: "other",
        text: "Tomorrow around 2 PM works for me.",
        time: "10:05 AM",
    },
];

function ChatWindow() {
    return (
        <div className="chat-window">

            {/* Header */}

            <div className="chat-header">

                <div className="chat-user">

                    <div className="chat-avatar">
                        R
                        <span className="online-dot"></span>
                    </div>

                    <div>
                        <h3>Rahul Sharma</h3>
                        <p>🟢 Active Now</p>
                    </div>

                </div>

                <div className="chat-actions">

                    <div className="chat-action">
                        📞
                    </div>

                    <div className="chat-action">
                        📹
                    </div>

                    <div className="chat-action">
                        ⋮
                    </div>

                </div>

            </div>

            {/* Messages */}

            <div className="chat-messages">

                {messages.map((message) => (

                    <MessageBubble
                        key={message.id}
                        message={message}
                    />

                ))}

            </div>

            {/* Input */}

            <MessageInput />

        </div>
    );
}

export default ChatWindow;