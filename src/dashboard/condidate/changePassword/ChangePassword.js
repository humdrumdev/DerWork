
import PasswordForm from "./passwordForm";
const ChangePassword = (props) => {



    return (
        <div >
                <h1>Change Password</h1>
                <p className="pxp-text-light">Choose a new account password.</p>

                <div className="mt-4 mt-lg-5">
                    <PasswordForm/>
                </div>
                
            </div>
            )
            }

export default ChangePassword;