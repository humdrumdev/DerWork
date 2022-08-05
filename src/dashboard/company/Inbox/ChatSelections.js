import Selection from "./Selection";
import { useEffect, useState } from "react";
import messageService from "../../../services/messages.service";
import AuthService from "../../../services/auth/auth.service";

const ChatSelections = ({ callback }) => {
    //get messages
    const [chats, setChats] = useState([]);
    //loading
    const [loading, setLoading] = useState(true);
    //get user
    const [user, setUser] = useState(AuthService.getCurrentUser());
    //get user id
    const [userId, setUserId] = useState(AuthService.getUserId());

    const [selectedChat, setSelectedChat] = useState(null);
    useEffect(() => {
        const fetchMessages = async () => {
            const { data } = await messageService.getchat();
            setChats(data);
            setLoading(false);
        };
        if (!chats.length)
            fetchMessages();
        else if (window.innerWidth > 992)
            handleSelect(chats[0].chat_id);
        // console.log(chats[0].chat_id);
    }, []);


    //send active chat to parent
    const handleSelect = (chatId) => {
        setSelectedChat(chatId);
        const select = chats.find(chat => chat.chat_id == chatId);
        const chat = {
            chatId: chatId,
            users: [
                {
                    userId: userId,
                    userName: user.firstName + " " + user.lastName,
                    userPhoto: process.env.REACT_APP_API_URL + user.photo
                },
                {
                    userId: select.users_id,
                    userName: select.users_first_name + " " + select.users_last_name,
                    userPhoto: process.env.REACT_APP_API_URL + select.users_photo
                }
            ]
        }
        callback(chat);
    }

    return (
        loading ?
            <div>loading</div>
            :
            (
                <div>
                    <div className="pxp-dashboard-inbox-search-form">
                        <div className="input-group">
                            <span className="input-group-text"><span className="fa fa-search"></span></span>
                            <input type="text" className="form-control" placeholder="Search messages..." />
                        </div>
                    </div>

                    <div className="mt-3 mt-lg-4 pxp-dashboard-inbox-list">
                        <ul className="list-unstyled">

                            {chats.map((chat, index) => {
                                return <Selection key={index} message={chat.messages_message} date={chat.messages_date} user={
                                    {
                                        name: chat.users_first_name + " " + chat.users_last_name,
                                        avatar: chat.users_photo,
                                        id: chat.users_id
                                    }
                                } chatId={chat.messages_chatId}
                                    callback={handleSelect} active={chat.messages_chatId == selectedChat}
                                    count={chat.unread}
                                />
                            })}
                        </ul>
                    </div>
                </div>
            )
    )
}
export default ChatSelections;