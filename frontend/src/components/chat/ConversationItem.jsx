function ConversationItem({ conversation }) {
    return (
        <div className="conversation-item">

            <div className="avatar">

                {conversation.name.charAt(0)}

                {conversation.online && (
                    <span className="online-dot"></span>
                )}

            </div>

            <div className="conversation-content">

                <div className="conversation-top">

                    <h4>{conversation.name}</h4>

                    <span>{conversation.time}</span>

                </div>

                <p className="role">
                    {conversation.role}
                </p>

                <div className="conversation-bottom">

                    <p className="last-message">
                        {conversation.lastMessage}
                    </p>

                    {conversation.unread > 0 && (
                        <div className="unread">
                            {conversation.unread}
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default ConversationItem;