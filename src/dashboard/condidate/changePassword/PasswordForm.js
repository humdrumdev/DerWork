import { useState } from "react";
import authService from "../../../services/auth/auth.service";
import Spinner from 'react-bootstrap/Spinner'

const PasswordForm = (props) => {

    //current password
    const [currentPassword, setCurrentPassword] = useState('');
    //new password
    const [newPassword, setNewPassword] = useState('');
    //confirm password
    const [confirmPassword, setConfirmPassword] = useState('');

    //error message
    const [errorMessage, setErrorMessage] = useState('');

    //success message
    const [successMessage, setSuccessMessage] = useState('');

    //loading
    const [loading, setLoading] = useState(false);

    //submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
            setErrorMessage('Please fill all the fields');
            setLoading(false);
        }
        else if (newPassword !== confirmPassword) {
            setErrorMessage('New password and confirm password does not match');
            setLoading(false);
        }
        else if (currentPassword === newPassword) {
            setErrorMessage('New password should not be same as current password');
            setLoading(false);
        }
        ///((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        else if (newPassword.length < 8 || !newPassword.match(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
            setErrorMessage('Password must be at least 8 characters long and contain at least one number, one special character and one uppercase letter');
            setLoading(false);
        }
        else {
            try
            {
                authService.changePassword(currentPassword, newPassword).then(
                    (response) => {
                        if(response.data == false)
                        {
                            setErrorMessage('Current password is incorrect');
                            setLoading(false);
                        }else
                        {
                            setSuccessMessage('Password changed successfully');
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



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                        
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mt-3">
                                    <label className="my-1">Current Password</label>
                                    <input type="password" className="form-control" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="my-1">New Password</label>
                                    <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className="form-group mt-3">
                                    <label className="my-1">Confirm Password</label>
                                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <button className="btn btn-primary m-auto d-block mt-4 " type="submit">
                                    {
                                        loading ? <Spinner animation="border" size="sm" />
                                        : null
                                    }
                                    <span className="ml-3">
                                    Change Password
                                    </span>
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

export default PasswordForm;