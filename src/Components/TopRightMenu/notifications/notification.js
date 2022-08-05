import { Link } from "react-router-dom";

const Notification = ({ notification }) => {
    const {
        id,
        message,
        date,
    } = notification;

    const handleClick = () => {
        console.log(id);
    };

    return (
        <li onClick={handleClick}>
            <Link className="dropdown-item" to="/dashboard/company/notifications">
                <div dangerouslySetInnerHTML={{ __html: message }} />

                <span className="pxp-is-time">{date}</span>
            </Link>
        </li>
    );
}

export default Notification;