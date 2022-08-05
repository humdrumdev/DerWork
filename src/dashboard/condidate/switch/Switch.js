import { useState } from "react";
import userService from "../../../services/user.service";
import ProfilePhoto from "../profile/ProfilePhoto";
import userImage from '../../../assets/user.svg';
import authService from "../../../services/auth/auth.service";

const Switch = () => {
    const [companyname , setcompanyname] = useState('');
    const [industry , setIndustry] = useState('');
    const [loading , setLoading] = useState(false);
    
    const [errorMessage , setErrorMessage] = useState('');
    const [successMessage , setSuccessMessage] = useState('');

    const [photo , setPhoto] = useState(userImage);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(e.target.id !== "form1")
        {
            return;
        }
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        if (companyname === '' || industry === '') {
            setErrorMessage('Please fill all the fields');
            setLoading(false);
        }
        else {
            try
            {
                userService.updateCompanyNameImage({companyname, industry, photo}).then(
                    (response) => {
                        userService.setIsCompanyAndStatus(true).then(() => {
                            setSuccessMessage('Company switched successfully');
                            setLoading(false);
                            let auser = authService.getCurrentUser();
                            auser.company = true;
                            auser.companyName = companyname;
                            auser.photo = response.data.photo;
                            localStorage.setItem("user", JSON.stringify(auser));
                            setTimeout(() => {
                                window.location.href = '/dashboard';
                            }
                            , 2000);

                        }),
                        (error) => {
                            setErrorMessage('Something went wrong');
                            setLoading(false);
                        }
                    }
                    , (error) => {
                        setErrorMessage(error.message);
                        setLoading(false);
                    }
                );
            }
            catch (error) {
                setErrorMessage(error.message);
                setLoading(false);
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
                setPhoto(file);
            })
        //from file to form data
    }


    return (
        <div >
                <h1>Switch To Company</h1>
                <p className="pxp-text-light">
                    Switch to your company account to manage your jobs and candidates.
                </p>
            <div className="pxp-dashboard-content-header-form">
                

            <div className="card-body">
                            <div className="col-md-5 m-auto">

                            <form onSubmit={handleSubmit} id="form1">
                                <ProfilePhoto user={{photo:photo}} handleNewPhoto={handleNewPhoto}/>
                                <div className="form-group mt-3">
                                    <label className="my-1" htmlFor="companyname">Company Name</label>
                                    <input type="text" className="form-control" id="companyname" placeholder="Company Name" onChange={(e) => setcompanyname(e.target.value)} />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="my-1" htmlFor="industry">Industry</label>
                                    <input type="text" className="form-control" id="industry" placeholder="Industry" onChange={(e) => setIndustry(e.target.value)} />
                                </div>
                                <button type="submit" className="btn rounded-pill pxp-section-cta my-3 mx-auto d-block">
                                    {loading ? 'Loading...' : 'Switch'}    
                                </button>
                                <div className="mt-3">
                                    {
                                        errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null
                                    }
                                    {
                                        successMessage ? <div className="alert alert-success">{successMessage}</div> : null
                                    }
                                </div>
                            </form>
                                
                            </div>
                        </div>
            </div>
        </div>
    )
}

export default Switch;