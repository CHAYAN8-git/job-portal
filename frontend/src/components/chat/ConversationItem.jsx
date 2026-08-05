import { useAuth } from "../../context/AuthContext";

function ConversationItem({

    conversation,
    active,
    onClick,

}) {

    const { user, onlineUsers } = useAuth();

    const otherUser = conversation.participants.find(

        participant => participant._id !== user._id

    );

    const isOnline = onlineUsers.includes(otherUser?._id);

    function formatTime(date) {

        if (!date) return "";

        const now = new Date();
        const messageDate = new Date(date);

        if (now.toDateString() === messageDate.toDateString()) {

            return messageDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

        }

        return messageDate.toLocaleDateString([], {
            day: "numeric",
            month: "short",
        });

    }

    return (

        <div
            className={`conversation-item ${active ? "active" : ""}`}
            onClick={onClick}
        >

            <div className="avatar">

                {otherUser?.fullName?.charAt(0)}

                {isOnline && (
                    <span className="online-dot"></span>
                )}

            </div>

            <div className="conversation-content">

                <div className="conversation-top">

                    <h4>{otherUser?.fullName}</h4>

                    <span className="conversation-time">

                        {formatTime(conversation.updatedAt)}

                    </span>

                </div>

                <p className="role">

                    {otherUser?.role}

                </p>

                <div className="conversation-bottom">

                    <p className="last-message">

                        {conversation.lastMessage
                            ? conversation.lastMessage
                            : "Start chatting..."}

                    </p>

                    {conversation.unreadCount > 0 && (

                        <span className="unread-badge">

                            {conversation.unreadCount}

                        </span>

                    )}

                </div>

            </div>

        </div>

    );

}

export default ConversationItem;