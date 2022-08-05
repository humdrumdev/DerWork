import authService from "../../../../services/auth/auth.service";
import { useEffect, useState } from "react";
import userService from "../../../../services/user.service";
import Education from "../../../../dashboard/condidate/profile/Education";
import Experience from "../../../../dashboard/condidate/profile/Experience";
import Skill from "../../../../dashboard/condidate/profile/Skill";
import { Spinner } from "react-bootstrap";

const Step3 = ({
    handelNext,
    handelPrev,
    handleSkip,
}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [sending, setSending] = useState(false);
    useEffect(() => {
        userService.getUserFullData().then(user => {
            setUser(user.data);
            setLoading(false);
        })
    }, [])
    const handleSubmit = () => {
        setSending(true);
        userService.updateUserNameImage(user).then(user => {
            setSending(false);
            setUser(user.data);
            let auser = authService.getCurrentUser();
            auser.photo = user.data.photo;
            auser.firstName = user.data.first_name;
            auser.lastName = user.data.first_name;
            localStorage.setItem("user", JSON.stringify(auser));
            handleSkip();
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
                        {
                            user.isCompany ?
                                (
                                    null
                                )
                                :
                                (
                                    <div>
                                        <Skill ss={user.userSkills} />
                                        <Experience es={user.experiences} />
                                        <Education es={user.educations} />
                                    </div>
                                )
                        }
                    </div>
            }
            <div className='row '>
                <div className='col-6 '>
                    <button className='btn rounded-pill pxp-subsection-cta m-2 ' style={{ float: "right" }} color="primary" variant="contained" type="button" onClick={handelPrev} >
                        Previus
                    </button>
                </div>
                <div className='col-6 '>
                    <button className='btn rounded-pill pxp-section-cta m-2' color="primary" variant="contained" type="button" onClick={handleSubmit}>
                    {
                                    sending ? <Spinner animation="border" size="sm" />
                                    : <i className="fa fa-check"></i>
                                }
                        Finish
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Step3;