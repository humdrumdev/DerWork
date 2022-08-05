import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth/auth.service";
import ChatsTable from "./notifications/ChatsTable";
import NotificationsTable from "./notifications/notificationsTable";

const UserMenu = ({ hide }) => {

    const user = authService.getCurrentUser();

    const navigate = useNavigate();

    const logout = () => {
        authService.logout();
        navigate("/login");
    };

    return (


        <nav className="pxp-user-nav pxp-on-light">
            <Link to={"/dashboard/post"} className="btn rounded-pill pxp-nav-btn" hidden={hide}>Post a Job</Link>
            <div hidden={hide}><NotificationsTable /></div>
            <div hidden={hide}><ChatsTable /></div>

            <div className="dropdown pxp-user-nav-dropdown">
                <a href="index.html" className="dropdown-toggle" data-bs-toggle="dropdown">
                    <div className="pxp-user-nav-avatar pxp-cover" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + user.photo})` }}></div>
                    <div className="pxp-user-nav-name d-none d-md-block">{user.company ? user.companyName : user.firstName}</div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link to={"/" + authService.getUserId()} className="dropdown-item" >Profile</Link></li>
                    <li><Link to={"/dashboard/"} className="dropdown-item" >Dashboard</Link></li>
                    <li onClick={logout}><a className="dropdown-item"  >Logout</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default UserMenu;