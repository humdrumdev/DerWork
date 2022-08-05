import { useEffect, useState } from "react";
import Chat from "./chat";
import chatService from "../../../services/messages.service";

//import Link
import { Link } from "react-router-dom";
const ChatsTable = () => {

    //loadin
    const [loading, setLoading] = useState(true);
    //count
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchChats = async () => {
            const { data } = await chatService.getUnreadMessagesCount();
            console.log(data);
            setLoading(false);
            setCount(data);
        };
        fetchChats();
    }, []);


    return (

        <div className="dropdown pxp-user-nav-dropdown pxp-user-notifications">
            <Link to="/dashboard/inbox" className="dropdown-toggle" >
                <span className="fa fa-envelope-o"></span>
                <div className="pxp-user-notifications-counter">{count}</div>
            </Link>
            {/* <ul className="dropdown-menu dropdown-menu-end">
                {loading ?
                    <div>loading</div>
                    :
                    chats.map(chat => (
                        <Chat key={chat.id} chat={chat} />
                    ))}
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item pxp-link" to="/dashboard/company/chats">Read All</Link></li>
            </ul> */}
        </div>

    )
}

export default ChatsTable;