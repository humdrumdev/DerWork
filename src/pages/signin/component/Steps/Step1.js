
import authService from "../../../../services/auth/auth.service";
import userService from "../../../../services/user.service";
import { Spinner } from "react-bootstrap";
import {useState} from 'react'
const Step1 = ({
    handelNext,
    handelPrev,
}) => {
    const [sendingCompany, setSendingCompany] = useState(false);
    const [sendingUser, setSendingUser] = useState(false);

    const setUserStatus = (isCompany) => {
        setSendingCompany(isCompany);
        setSendingUser(!isCompany);
        userService.setIsCompanyAndStatus(isCompany, "active").then(
            (response) => {
                console.log(response);
                let user = authService.getCurrentUser();
                user.company = isCompany;
                user.status = "active";
                localStorage.setItem("user", JSON.stringify(user));
                handelNext();
            },
            (error) => {
                console.log(error);
            }
        );
    }
    return (
        <div className="stepper-step-1">
            <div className="py-5">
                <h1 style={{ fontSize: "4em" }}><strong>Select.</strong></h1>
                <p>You can Always Switch if want</p>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <button onClick={() => setUserStatus(false)} className="text-left btn btn-outline-primary btn-block btn-lg b-32 py-3">
                        <div className="d-flex">
                            <span className="display-1"><i className="bi bi-people"></i></span>
                            <h1 className="m-4 py-3"><strong>For Jobseekers</strong></h1>
                        </div>
                        <p className="mb-3"> Find jobs available on our platform. Apply to Customer Service Representative, Crew Member, House Cleaner and more!
                        </p>
                        <button className="btn btn-primary btn-block btn-lg b-32 actions">
                            {
                                sendingUser ? <Spinner animation="border" size="sm" /> : <span>Select <i className="fa fa-arrow-right"></i></span>
                            }
                            
                        </button>
                    </button>
                </div>
                <div className="col-md-6">
                    <button onClick={() => setUserStatus(true)} className="text-left btn btn-outline-primary btn-block btn-lg b-32 py-3">
                        <div className="d-flex">
                            <span className="display-1"><i className="bi bi-people"></i></span>
                            <h1 className="m-4 py-3"><strong>For Eanterprises</strong></h1>
                        </div>
                        <p className="mb-3"> et's make your next great hire. Fast.
                            You know who you're looking for.
                            We'll help you find them.
                            <br />

                            Start by Searching 37.5 Million CVs for FREE
                        </p>
                        <button className="btn btn-primary btn-block btn-lg b-32 actions">
                            {
                                sendingCompany ? <Spinner animation="border" size="sm" /> : <span>Select <i className="fa fa-arrow-right"></i></span>
                            }
                            
                        </button>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Step1;