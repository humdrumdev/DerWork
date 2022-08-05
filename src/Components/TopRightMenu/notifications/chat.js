import { Link } from "react-router-dom";

const Chat = ({ chat }) => {
    const {
        id,
        message,
        date,
    } = chat;

    const handleClick = () => {
        console.log(id);
    };

    return (
        <li onClick={handleClick}>
            <Link className="dropdown-item" to="/dashboard/company/chats">
                <div dangerouslySetInnerHTML={{ __html: message }} />

                <span className="pxp-is-time">{date}</span>
            </Link>
        </li>

    );
}

export default Chat;