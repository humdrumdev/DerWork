import React from "react";
import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import UserMenu from "../../Components/TopRightMenu/UserMenu";
import authService from "../../services/auth/auth.service";
import { useState, useEffect } from "react";
import messageService from "../../services/messages.service";
import notificationService from "../../services/notifications.service";
import logo from "../../assets/logo.png";
const CondadateDashboardLayout = (props) => {
    const [messages, setMessages] = useState(0);
    const [notifications, setNotifications] = useState(0);

    // <li> <NavLink to={"/dashboard/"} className={({ isActive }) => (isActive ? 'pxp-active' : null) + " pxp-animate"} > <span className="fa fa-home"></span>Dashboard </NavLink> </li>
    // <li><NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null)} to="profile" ><span className="fa fa-pencil"></span>Edit Profile</NavLink></li>
    // <li><NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null)} to="applications"><span className="fa fa-file-text"></span>Applications</NavLink></li>
    // <li><NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null)} to="favourites"><span className="fa fa-heart"></span>Favourites</NavLink></li>
    // <li><NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null)} to="password"><span className="fa fa-lock"></span>Change Password</NavLink></li>
    // <li><NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null)} to="switch"><span className="fa fa-briefcase"></span>Switch To Company</NavLink></li>
    const menu = [
        { label: "Dashboard", link: "/dashboard/", icon: "fa fa-home", isActive: true },
        { label: "Profile", link: "/dashboard/profile", icon: "fa fa-pencil" },
        { label: "Applications", link: "/dashboard/applications", icon: "fa fa-file-text" },
        { label: "Favourites", link: "/dashboard/favourites", icon: "fa fa-heart" },
        { label: "Change Password", link: "/dashboard/password", icon: "fa fa-lock" },
        { label: "Switch To Company", link: "/dashboard/switch", icon: "fa fa-briefcase" },
    ];
    // <li>
    //                         <NavLink className={({ isActive }) => (isActive ? 'pxp-active d-flex justify-content-between align-items-center' : "d-flex justify-content-between align-items-center")} to="inbox">
    //                             <div><span className="fa fa-envelope-o"></span>Inbox</div>
    //                             <span className="badge rounded-pill">{messages}</span>
    //                         </NavLink>
    //                     </li>
    //                     <li>
    //                         <NavLink className={({ isActive }) => (isActive ? 'pxp-active d-flex justify-content-between align-items-center' : "d-flex justify-content-between align-items-center")} to="notifications">
    //                             <div><span className="fa fa-bell-o"></span>Notifications</div>
    //                             <span className="badge rounded-pill">{notifications}</span>
    //                         </NavLink>
    //                     </li>
    const insights = [
        { label: "Inbox", link: "/dashboard/inbox" , icon: "fa fa-envelope-o" , value: messages},
        { label: "Notifications", link: "/dashboard/notifications" , icon: "fa fa-bell-o" , value: notifications},
    ];







    useEffect(() => {
        const fetchMessages = async () => {
            const { data } = await messageService.getUnreadMessagesCount();
            setMessages(data);
        };
        const fetchNotifications = async () => {
            const { data } = await notificationService.getUreadedNotificationsCount();
            setNotifications(data);
        };
        fetchMessages();
        fetchNotifications();
    }, []);
    return (
        <div style={{ backgroundColor: "var(--pxpSecondaryColorLight)" }}>
            <div className="pxp-dashboard-side-panel d-none d-lg-block">
                <div className="pxp-logo">
                    <Link to="/" className="pxp-animate"><span style={{ color: "var(--pxpMainColor)" }}>Der</span>Work</Link>
                </div>

                <nav className="mt-3 mt-lg-4 d-flex justify-content-between flex-column pb-100">
                    <div className="pxp-dashboard-side-label">Admin tools</div>
                    <ul className="list-unstyled">
                        {/* <li> <NavLink to={"/dashboard/"} className={({ isActive }) => (isActive ? 'pxp-active' : null) + " pxp-animate"} > <span className="fa fa-home"></span>Dashboard </NavLink> </li>
                        <li><NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null)} to="profile" ><span className="fa fa-pencil"></span>Edit Profile</NavLink></li>
                        <li><NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null)} to="applications"><span className="fa fa-file-text"></span>Applications</NavLink></li>
                        <li><NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null)} to="favourites"><span className="fa fa-heart"></span>Favourites</NavLink></li>
                        <li><NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null)} to="password"><span className="fa fa-lock"></span>Change Password</NavLink></li>
                        <li><NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null)} to="switch"><span className="fa fa-briefcase"></span>Switch To Company</NavLink></li> */}
                        {menu.map((item, index) => {
                            return (
                                <li key={index}>
                                    <NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null + " pxp-animate")} to={item.link}>
                                        <div><span className={item.icon}></span>{item.label}</div>
                                    </NavLink>
                                </li>
                            );
                        })}

                    </ul>
                    <div className="pxp-dashboard-side-label mt-3 mt-lg-4">Insights</div>
                    <ul className="list-unstyled">
                        {/* <li>
                            <NavLink className={({ isActive }) => (isActive ? 'pxp-active d-flex justify-content-between align-items-center' : "d-flex justify-content-between align-items-center")} to="inbox">
                                <div><span className="fa fa-envelope-o"></span>Inbox</div>
                                <span className="badge rounded-pill">{messages}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => (isActive ? 'pxp-active d-flex justify-content-between align-items-center' : "d-flex justify-content-between align-items-center")} to="notifications">
                                <div><span className="fa fa-bell-o"></span>Notifications</div>
                                <span className="badge rounded-pill">{notifications}</span>
                            </NavLink>
                        </li> */}
                        {insights.map((insight, index) => {
                            return (
                                <li key={index}>
                                    <NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null) + " d-flex justify-content-between align-items-center"} to={insight.link}>
                                        <div><span className={insight.icon}></span>{insight.label}</div>
                                        <span className="badge rounded-pill">{insight.value}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <nav className="pxp-dashboard-side-user-nav-container" style={{ backgroundColor: "var(--pxpSecondaryColorLight)" }}>
                    <div className="pxp-dashboard-side-user-nav">
                        <UserMenu hide={true} />
                    </div>
                </nav>
            </div>
            <div className="pxp-dashboard-content">
                <div className="pxp-dashboard-content-header pxp-is-candidate">
                    <div className="pxp-nav-trigger navbar pxp-is-dashboard d-lg-none">
                        <a role="button" data-bs-toggle="offcanvas" data-bs-target="#pxpMobileNav" aria-controls="pxpMobileNav">
                            <div className="pxp-line-1"></div>
                            <div className="pxp-line-2"></div>
                            <div className="pxp-line-3"></div>
                        </a>
                        <div className="offcanvas offcanvas-start pxp-nav-mobile-container pxp-is-dashboard pxp-is-candidate" tabIndex="-1" id="pxpMobileNav">
                            <div className="offcanvas-header">
                                <div className="pxp-logo">
                                    <img width={132} src={logo} alt="logo" />
                                </div>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <nav className="pxp-nav-mobile">
                                    <ul className="navbar-nav justify-content-end flex-grow-1">
                                        <li className="pxp-dropdown-header">Admin tools</li>
                                        {menu.map((item, index) => {
                                            return (
                                                <li key={index} data-bs-dismiss="offcanvas" aria-label="Close">
                                                    <NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null)} to={item.link} >
                                                        <div><span className={item.icon}></span>{item.label}</div>
                                                    </NavLink>
                                                </li>
                                            );
                                        })}


                                        <li className="pxp-dropdown-header mt-4">Insights</li>
                                        {/* <li className="nav-item">
                                            <a href="company-dashboard-inbox.html" className="d-flex justify-content-between align-items-center">
                                                <div><span className="fa fa-envelope-o"></span>Inbox</div>
                                                <span className="badge rounded-pill">14</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="company-dashboard-notifications.html" className="d-flex justify-content-between align-items-center">
                                                <div><span className="fa fa-bell-o"></span>Notifications</div>
                                                <span className="badge rounded-pill">5</span>
                                            </a>
                                        </li> */}
                                        {insights.map((insight, index) => {
                                            return (
                                                <li key={index} data-bs-dismiss="offcanvas" aria-label="Close">
                                                    <NavLink className={({ isActive }) => (isActive ? 'pxp-active' : null) + " d-flex justify-content-between align-items-center"} to={insight.link}>
                                                        <div><span className={insight.icon}></span>{insight.label}</div>
                                                        <span className="badge rounded-pill">{insight.value}</span>
                                                    </NavLink>
                                                </li>
                                            );
                                        })}

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <UserMenu />

                </div>

                <div className="pxp-dashboard-content-details">
                    <Outlet />
                </div>

                <footer>
                    <div className="pxp-footer-copyright pxp-text-light">© 2021 DerWork. All Right Reserved.</div>
                </footer>
            </div>

        </div>
    );

}

export default CondadateDashboardLayout;