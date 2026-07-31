import {
    Smile,
    Paperclip,
    SendHorizontal,
    Mic
} from "lucide-react";

function MessageInput() {

    return (

        <div className="message-input">

            <button className="input-icon">
                <Smile size={20}/>
            </button>

            <button className="input-icon">
                <Paperclip size={20}/>
            </button>

            <input
                type="text"
                placeholder="Type your message..."
            />

            <button className="input-icon">
                <Mic size={20}/>
            </button>

            <button className="send-btn">

                <SendHorizontal size={18}/>

            </button>

        </div>

    );

}

export default MessageInput;