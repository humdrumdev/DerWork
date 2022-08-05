

import { Link, NavLink } from "react-router-dom";
const Selection = ({ message, date, user, chatId, callback, active, count }) => {
    const handleSelect = () => {
        callback(chatId);
    }
    return (
        <li className={active ? "pxp-active" : null}>
            <span  //to={`/dashboard/company/inbox/${chatId}`}
                onClick={handleSelect}
                className="pxp-dashboard-inbox-list-item">
                <div className="pxp-dashboard-inbox-list-item-top">
                    <div className="pxp-dashboard-inbox-list-item-left">
                        <div className="pxp-dashboard-inbox-list-item-avatar pxp-cover" style={{ backgroundImage: `url(${user.avatar})` }}></div>
                        <div className="pxp-dashboard-inbox-list-item-name ms-2">{user.name}</div>
                    </div>
                    <div className="pxp-dashboard-inbox-list-item-right">
                        <div className="pxp-dashboard-inbox-list-item-time">{date}</div>
                    </div>
                </div>
                <div className="mt-2 d-flex justify-content-between">
                    <div className="pxp-dashboard-inbox-list-item-text pxp-text-light">{message}</div>

                    {
                        count > 0 ?
                            <div className="pxp-dashboard-inbox-list-item-no ms-3"><span className="badge rounded-pill">{count}</span></div>
                            : null
                    }
                </div>
            </span>
        </li>
    )
}

export default Selection;