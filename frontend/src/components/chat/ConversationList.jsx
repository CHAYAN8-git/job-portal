import ConversationItem from "./ConversationItem";

const conversations = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Frontend Developer",
        lastMessage: "Hey bro, is this position still open?",
        time: "2m",
        unread: 2,
        online: true,
    },
    {
        id: 2,
        name: "Priya Singh",
        role: "React Developer",
        lastMessage: "Thank you for accepting my application!",
        time: "15m",
        unread: 0,
        online: false,
    },
    {
        id: 3,
        name: "Aman Verma",
        role: "UI/UX Designer",
        lastMessage: "Can we schedule an interview?",
        time: "1h",
        unread: 1,
        online: true,
    },
];

function ConversationList() {

    return (

        <div className="conversation-list">

            <h2>Messages</h2>

            <input
                className="chat-search"
                placeholder="Search conversations..."
            />

            <div className="conversation-items">

                {conversations.map((conversation) => (

                    <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                    />

                ))}

            </div>

        </div>

    );

}

export default ConversationList;