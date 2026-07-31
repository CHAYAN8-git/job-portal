function MessageBubble({ message }) {

    return (

        <div
            className={
                message.sender === "me"
                    ? "message me"
                    : "message other"
            }
        >

            <p>{message.text}</p>

            <span>{message.time}</span>

        </div>

    );

}

export default MessageBubble;