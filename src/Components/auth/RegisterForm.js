import React, { useState, useEffect } from "react";
import authService from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import SignUpStepper from "../../pages/signin/component/SignUpStepper";
import Modal from 'react-bootstrap/Modal';

const RegisterForm = ({registerHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(email, password).then(
        (data) => {
          navigate("/");
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };






  useEffect(() => {
  }, []);


  const handleComplete = () => {
    handleClose()
    navigate("/")
  }

  return (

    <div>

      <h5 className="modal-title text-center mt-4" id="signinModal">Create an account</h5>
      <form className="mt-4" onSubmit={handleLogin}>

        <div className="form-floating mb-3">
          <input type="text" 
            className="form-control" 
            id="pxp-signin-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
          <label htmlFor="pxp-signin-email">Email address</label>
          <span className="fa fa-envelope-o"></span>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="pxp-signin-password" placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="pxp-signin-password">Password</label>
          <span className="fa fa-lock"></span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="btn rounded-pill pxp-modal-cta" type="submit" >Continue</button>

        </div>
        <div className="mt-4 text-center pxp-modal-small">
          {/* <a href="https://derwork.com/themes/derwork/sign-in.html#" className="pxp-modal-link">Forgot password</a> */}
        </div>
        <div className="mt-4 text-center pxp-modal-small">
        Already have an account? <a onClick={registerHandler}  role="button" className="" data-bs-target="#pxp-signup-modal" data-bs-toggle="modal" data-bs-dismiss="modal">Sign in</a>
        </div>

      </form>
    </div>
  );

};

export default RegisterForm;
