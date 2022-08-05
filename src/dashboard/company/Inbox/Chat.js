import { useEffect, useState } from "react";
import messageService from "../../../services/messages.service";
import Message from "./Message";
import AuthService from "../../../services/auth/auth.service";
import SendMessage from "./SendMessage";
const Chat = ({ chat,callback }) => {
    console.log(chat);
    //get messages
    const [messages, setMessages] = useState([]);
    //loading
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const fetchMessages = async () => {
            const { data } = await messageService.getMessagesByChatId(chat.chatId);
            setMessages(data.messages);
            console.log(data.messages);
            setLoading(false);
            scrollToBottom();

        };
        fetchMessages();
    }, [chat.chatId]);



    //scroll to bottom smoothly
    const scrollToBottom = () => {
        const messagesContainer = document.getElementById("chat-container");
        //scroll to bottom smoothly
        messagesContainer.scrollTop = messagesContainer.scrollHeight;


    };
    //add chat message
    const handleSendMessage = async (message) => {
        const _message =
        {
            message: message,
            chatId: 1,
            date: null,
            id: 0,
            senderId: chat.users[0].userId,
            status: "loading"
        }
        let my = [...messages, _message];
        setMessages(my);
        const { data } = await messageService.sendMessage(message, chat.users[1].userId, chat.chatId);
        console.log(data);
        const newMessages = my.map(m => {
            if (m.id === 0) {
                return data;
            }
            return m;
        });
        console.log(newMessages);
        console.log(messages);
        scrollToBottom();
        setMessages(newMessages);
    }

    return (
        loading ?
            <div>loading</div>
            :
            (
                <div className="pxp-dashboard-inbox-messages-container">
                    <div className="pxp-dashboard-inbox-messages-header">
                        <div className="pxp-dashboard-inbox-list-item-left">
                            <div className="pxp-dashboard-inbox-list-item-avatar pxp-cover" style={{ backgroundImage: `url(${chat.users[1].userPhoto})` }}></div>
                            <div className="pxp-dashboard-inbox-list-item-name ms-2">{chat.users[1].userName}</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="pxp-dashboard-inbox-list-item-options">
                                <button title="Delete conversation"><span className="fa  fa-flag-o"></span></button>
                            </div>
                            <button onClick={callback}
                            className="btn rounded-pill pxp-dashboard-inbox-messages-close-btn d-inline-block d-xxl-none"><span className="fa fa-angle-left"></span> Back</button>
                        </div>
                    </div>
                    <div id="chat-container" className="pxp-dashboard-inbox-messages-content">
                        {
                            messages.map((message, index) => {
                                return <Message key={index} message={message.message} date={message.date} user={
                                    message.senderId == chat.users[0].userId ?
                                        chat.users[0]
                                        :
                                        chat.users[1]
                                } me={message.senderId == chat.users[0].userId} status={message.status} />
                            })
                        }

                    </div>
                    <SendMessage userId={chat.users[1].userId} chatId={chat.chatId} messageHandler={handleSendMessage} />
                </div>
            )
    )
}

export default Chat;