
import { Link, useParams } from "react-router-dom";
import {useState} from "react";
import authService from "../../../services/auth/auth.service";
import userService from "../../../services/user.service";
import ChangeCover from "./ChangeCover";
const HeaderProfile = ({ user }) => {

    const id = useParams();
    const [loading, setLoading] = useState(false);
    const [cover, setCover] = useState(user.cover);
    const handleNewPhoto = (ablob) => {
        setLoading(true);
        fetch(ablob)
            .then(res => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                //file = blobToFile(blob,"download.jpg");
                //new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
                const file = new File([blob], "download.jpg", { lastModified: new Date().getTime(), type: blob.type });
                userService.changeCover(file).then(res => {
                    setLoading(false);
                    setCover(res.data.cover);
                });
                
                // setLoading(false);
            })
        //from file to form data
    }

    return (
        <div className="pxp-single-candidate-hero pxp-cover pxp-boxed" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + cover})` }}>

            <div className="pxp-hero-opacity">
                {
                    id.id == authService.getUserId() ?
                        <div style={{ float: "right", display:"flex", alignItems:"center" }}>
                            <ChangeCover handleNewPhoto={handleNewPhoto} loading={loading} />
                            <Link to="/dashboard/profile/"> <button className="btn rounded-pill pxp-nav-btn m-3">Edit Profile</button></Link>
                        </div>
                        : null
                }

            </div>

            <div className="pxp-single-candidate-hero-caption">
                <div className="pxp-single-candidate-hero-content d-block text-center">
                    <div className="pxp-single-candidate-hero-avatar d-inline-block bg-white" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + user.photo})` }}></div>
                    <div className="pxp-single-candidate-hero-name ms-0 mt-3">
                        {
                            user.isCompany ?
                                <h1>{user.companyname}</h1> :
                                <h1>{user.first_name} {user.last_name}</h1>
                        }
                        <div className="pxp-single-candidate-hero-title">{user.title}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeaderProfile;