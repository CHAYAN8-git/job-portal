import ConversationItem from "./ConversationItem";

function ConversationList({

    conversations,
    selectedConversation,
    setSelectedConversation,

}) {

    return (

        <div className="conversation-list">

            <h2>Messages</h2>

            <input
                className="chat-search"
                placeholder="Search..."
            />

            <div className="conversation-items">

                {conversations.map((conversation) => (

                    <ConversationItem
                        key={conversation._id}
                        conversation={conversation}
                        active={
                            selectedConversation?._id === conversation._id
                        }
                        onClick={() =>
                            setSelectedConversation(conversation)
                        }
                    />

                ))}

            </div>

        </div>

    );

}

export default ConversationList;