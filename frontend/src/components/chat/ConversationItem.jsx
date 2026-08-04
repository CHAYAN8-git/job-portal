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

                </div>

                <p className="role">

                    {otherUser?.role}

                </p>

                <div className="conversation-bottom">

                    <p className="last-message">

                        Start chatting...

                    </p>

                </div>

            </div>

        </div>

    );

}

export default ConversationItem;