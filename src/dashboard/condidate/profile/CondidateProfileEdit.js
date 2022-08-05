
import * as React from "react"
import userService from "../../../services/user.service";
import Education from "./Education";
import Experience from "./Experience";
import Skill from "./Skill";
import InformationForm from "./forms/InformationForm";
import ProfilePhoto from "./ProfilePhoto";
import CompanyInformationForm from "./forms/company/CompanyInformationForm";
import { Spinner } from "react-bootstrap";

const CondadateProfileEdit = () => {

    const [user, setUser] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [sending, setSending] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([]);
    React.useEffect(() => {
        userService.getUserFullData().then(user => {
            // console.log(user.data)
            setUser(user.data);
        })
    }, [])

    const handleUserChange = (e) => {
        e.preventDefault();
        console.log(e.target.name)
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    //submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        //check the form id
        if (e.target.id === "form1" && sending == false) {
            setSending(true);
            setError(false);
            console.log(user)
            if (user.isCompany) {
                userService.UpdateCompany(user).then(res => {
                    //update user image in local storage
                    const user = JSON.parse(localStorage.getItem("user"));
                    user.photo = res.data.photo;
                    user.companyName = res.data.companyname;
                    localStorage.setItem("user", JSON.stringify(user));
                    setSending(false);
                    setError(false);
                    setErrorMessages([]);
                },
                    err => {
                        setSending(false);
                        setError(true);
                        setErrorMessages(err.response.data.message);
                    }

                )
            } else {
                userService.updateUser(user).then(res => {
                    //update user image in local storage
                    const user = JSON.parse(localStorage.getItem("user"));
                    user.photo = res.data.photo;
                    user.firstName = res.data.first_name;
                    user.lastName = res.data.last_name;
                    localStorage.setItem("user", JSON.stringify(user));
                    setSending(false);
                }
                    , err => {
                        setSending(false);
                        setError(true);
                    }
                )
            }
        }
    }


    const handleNewPhoto = (ablob) => {
        fetch(ablob)
            .then(res => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                //file = blobToFile(blob,"download.jpg");
                //new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
                const file = new File([blob], "download.jpg", { lastModified: new Date().getTime(), type: blob.type });
                setUser({ ...user, photo: file })
            })
        //from file to form data

    }





    return (
        <div>
            <h1>Edit Profile</h1>
            <p className="pxp-text-light">Edit your candidate profile page info.</p>
            {
                user ? (
                    user.isCompany ? (
                        <form onSubmit={handleSubmit} id="form1">

                            <ProfilePhoto user={user} handleNewPhoto={handleNewPhoto} />
                            <CompanyInformationForm user={user} handleUserChange={handleUserChange} />

                            {
                                errorMessages.length > 0 ? (
                                    <div className="alert alert-danger">
                                        <ul className="m-0">
                                            {
                                                errorMessages.map((error, index) => {
                                                    return <li key={index}>{error}</li>
                                                }
                                                )
                                                }
                                        </ul>   
                                    </div>    
                                ) : null

                            }


                            <div className="mt-4 mt-lg-5">

                                <button className="btn rounded-pill pxp-section-cta">

                                    {
                                        error == false ?
                                            sending ? <Spinner animation="border" size="sm" />
                                                : <i className="fa fa-check"></i>
                                            : <i className="fa fa-warning"></i>

                                    }
                                    <span className="ml-3">
                                        Save Profile
                                    </span>
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} id="form1">

                            <ProfilePhoto user={user} handleNewPhoto={handleNewPhoto} />
                            <InformationForm user={user} handleUserChange={handleUserChange} />

                            <Skill ss={user.userSkills} />
                            <Experience es={user.experiences} />
                            <Education es={user.educations} />

                            <div className="mt-4 mt-lg-5">
                                <button className="btn rounded-pill pxp-section-cta">

                                    {
                                        error == false ?
                                            sending ? <Spinner animation="border" size="sm" />
                                                : <i className="fa fa-check"></i>
                                            : <i className="fa fa-warning"></i>

                                    }
                                    <span className="ml-3">
                                        Save Profile
                                    </span>
                                </button>
                            </div>
                        </form>
                    )
                ) : (
                    <div>Loading...</div>
                )
            }




        </div>
    );
};

export default CondadateProfileEdit;