import { useEffect, useState } from "react";
import Notification from "./notification";
import notificationService from "../../../services/notifications.service";
import PageSelect from "../../../Components/PageSelect";

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);
    //loadin
    const [loading, setLoading] = useState(true);
    const [reloading, setReloading] = useState(false);
    //count
    const [count, setCount] = useState(0);
    const [pages, setPages] = useState([]);
    const [activePage, setActivePage] = useState(1);

    const fetchNotifications = async (page) => {
        setReloading(true);
        notificationService.getnotifications({
            search: "",
            filters: "",
            limit: 10,
            page: page,
        }).then(res => {
            setNotifications(res.data[0]);
            setCount(res.data[1]);
            const numberOfPages = Math.ceil(res.data[1]/10);
            setPages(numberOfPages);
            setLoading(false);
            setReloading(false);
        }
        ).catch(err => {
            setLoading(false);
            setReloading(false);
        }
        );
    }




    useEffect(() => {
        
        fetchNotifications(1);
    }, []);

    const handleClickNotification = (page) => {
        setActivePage(page);
        fetchNotifications(page);
    }


    return (
        <div >
            <h1>Notifications</h1>
            <p className="pxp-text-light">History of all your received notifications.</p>

            {
                loading ?
                <div className="text-center w-100  py-5">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                    :
                    (
                        <div className="mt-4 mt-lg-5">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <tbody>
                                        {
                                            reloading ?
                                            <div className="text-center w-100  py-5">
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>:
                                            notifications.map(notification => (
                                                <Notification key={notification.id} notification={notification} />
                                            ))
                                        }
                                    </tbody>
                                </table>

                                <div className="row mt-4 mt-lg-5 w-100 justify-content-center align-items-center">
                                    <div className="col-auto">
                                        <PageSelect pages={pages} active={activePage} handleClick={handleClickNotification}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
export default Notifications;