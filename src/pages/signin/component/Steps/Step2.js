import { useEffect } from "react";
import NameTittleForm from "../../../../dashboard/condidate/profile/forms/NameTittleForm";
import NameIndustryForm from "../../../../dashboard/condidate/profile/forms/NameIndustryForm";
import userService from "../../../../services/user.service";
import authService from "../../../../services/auth/auth.service";
import { useState } from "react";
import ProfilePhoto from "../../../../dashboard/condidate/profile/ProfilePhoto";
import { Spinner } from "react-bootstrap";

const Step2 = ({
    handelNext,
    handelPrev,
    handleSkip,
}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        
        userService.getUserFullData().then(user => {
            userService.getUserLocation().then(location => {
                const a = user.data;
                a.city = location.data.city;
                a.country = location.data.country;
                a.countryCode = location.data.countryCode;
                setUser(a);
                setLoading(false);
            })

        })
    }, []);
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
    const handleUserChange = (e) => {
        e.preventDefault();
        console.log(e.target.name)
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = () => {
        setSending(true);

        if (user.isCompany)
            userService.updateCompanyNameImage(user).then(user => {
                setSending(false);
                setUser(user.data);
                let auser = authService.getCurrentUser();
                auser.photo = user.data.photo;
                auser.companyName = user.data.companyname;
                localStorage.setItem("user", JSON.stringify(auser));
                handleSkip();
            }, err => {
                setSending(false);
                setError(true);
            }
            
            )
        else
            userService.updateUserNameImage(user).then(user => {

                setUser(user.data);
                let auser = authService.getCurrentUser();
                auser.photo = user.data.photo;
                auser.firstName = user.data.first_name;
                auser.lastName = user.data.first_name;
                localStorage.setItem("user", JSON.stringify(auser));
                handelNext();
            })
    }

    return (
        <div>
            {
                loading ?
                <div className="tab-pane active" >
                <div className="d-flex justify-content-center   h-100  align-items-center" style={{ minHeight: "360px" }}>
                  <Spinner animation="grow" />
                </div>
              </div>
                    :
                    <div className="mt-5 p-3">
                        <ProfilePhoto user={user} handleNewPhoto={handleNewPhoto} />
                        <div className="col-lg-3 m-auto d-block">
                            {user.isCompany ? <NameIndustryForm user={user} handleUserChange={handleUserChange} /> :
                                <NameTittleForm user={user} handleUserChange={handleUserChange} />}
                        </div>
                        <div className='row '>
                            <div className='col-6 '>
                                <button className='btn rounded-pill pxp-subsection-cta m-2 ' style={{ float: "right" }} color="primary" variant="contained" type="button" onClick={handelPrev} >
                                    Previus
                                </button>
                            </div>
                            <div className='col-6 '>
                                <button className='btn rounded-pill pxp-section-cta m-2' color="primary" variant="contained" type="button" onClick={handleSubmit}>
                                {
                                    error == false ?
                                    sending ? <Spinner animation="border" size="sm" />
                                    : <i className="fa fa-check"></i>
                                    : <i className="fa fa-warning"></i>

                                }
                                    
                                    {user.isCompany ? (<span>Finish</span>) : (
                                    
                                    <span>Next</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

            }

        </div>
    )
}
export default Step2;