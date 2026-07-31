import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";

import "../styles/chat.css";

function Chat() {

    return (

        <section className="chat-page">

            <ConversationList />

            <ChatWindow />

        </section>

    );

}

export default Chat;
