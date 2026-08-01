import { useAuth } from "../../context/AuthContext";

function MessageBubble({ message }) {

    const { user } = useAuth();

    const isMe =
        message.sender._id === user._id;

    return (

        <div
            className={
                isMe
                    ? "message me"
                    : "message other"
            }
        >

            <p>{message.text}</p>

            <span>

                {new Date(
                    message.createdAt
                ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}

            </span>

        </div>

    );

}

export default MessageBubble;