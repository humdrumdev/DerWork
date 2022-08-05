import { Link } from "react-router-dom";

const Notification = ({ notification }) => {
    const {
        id,
        message,
        date,
        status,
    } = notification;

    const handleClick = () => {
        console.log(id);
    };

    return (

        <tr>
            <td onClick={handleClick} style={{ width: "75%" }}>
                <div className="pxp-dashboard-notifications-item-left">
                    <div className="pxp-dashboard-notifications-item-type"><span className="fa fa-briefcase"></span></div>
                    <div className="pxp-dashboard-notifications-item-message">
                        <div dangerouslySetInnerHTML={{ __html: message }} />
                    </div>
                </div>
            </td>
            <td style={{ width: "20%" }}><div className="pxp-dashboard-notifications-item-right">{date}</div></td>
            <td>
                <div className="pxp-dashboard-table-options">
                    <ul className="list-unstyled">
                        <li><button title="Delete"><span className="fa fa-trash-o"></span></button></li>
                    </ul>
                </div>
            </td>
        </tr>
    );
}

export default Notification;