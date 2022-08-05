
import messageService from "../../../services/messages.service";
import { useState } from "react";

const SendMessage = ({ chatId, userId, messageHandler }) => {

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    //handleSendMessage
    const handleSendMessage = async () => {
        setLoading(true);
        messageHandler(message);
        // const { data } = await messageService.sendMessage(message, userId, chatId);
    }

    return (
        <div className="pxp-dashboard-inbox-messages-footer">
            <div className="pxp-dashboard-inbox-messages-footer-field">
                <input type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}

                    className="form-control" placeholder="Type your message here..." />
            </div>
            <div className="pxp-dashboard-inbox-messages-footer-btn">
                <button onClick={handleSendMessage}
                    className="btn rounded-pill pxp-section-cta">Send</button>
            </div>
        </div>
    )
}

export default SendMessage;