import { useEffect, useState } from "react";
import Notification from "./notification";
import notificationService from "../../../services/notifications.service";
//import Link
import { Link } from "react-router-dom";
const NotificationsTable = () => {

    const [notifications, setNotifications] = useState([]);
    //loadin
    const [loading, setLoading] = useState(true);
    //count
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            const { data } = await notificationService.getnotifications({
                search: "",
                filters: "",
                limit: "",
                page: "",
            });
            console.log(data);
            setNotifications(data[0]);
            setLoading(false);
            setCount(data[1]);
        };
        fetchNotifications();
    }, []);


    return (

        <div className="dropdown pxp-user-nav-dropdown pxp-user-notifications">
            <a role="button" className="dropdown-toggle" data-bs-toggle="dropdown">
                <span className="fa fa-bell-o"></span>
                <div className="pxp-user-notifications-counter">{count}</div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
                {loading ?
                    <div>loading</div>
                    :
                    notifications.map(notification => (
                        <Notification key={notification.id} notification={notification} />
                    ))}
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item pxp-link" to="/dashboard/notifications">Read All</Link></li>
            </ul>
        </div>

    )
}

export default NotificationsTable;