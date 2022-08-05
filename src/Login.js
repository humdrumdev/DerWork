import React, { Component } from "react";
import LoginForm from "./Components/auth/LoginForm";
import RegisterForm from "./Components/auth/RegisterForm";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            register: false,
        };
    }



    registerHandler = () => {
        this.setState({
            register: !this.state.register
        })        
    };


    render() {
        return (
            //div.container
            
            <div className="container" style={{ minHeight: "calc(100vh - 100px)" }}>

                <div className="row align-items-center justify-content-center my-auto d-flex position-absolute h-100">
                    <div className="col-md-6">
                        <div className="pxp-login-form p-5 m-5">

                            <h1 className="pxp-text-light">How work</h1>
                            <h1 className="pxp-text-light">should work</h1>
                            <p className="pxp-text-light">Forget the old rules. You can have the best people.
                                Right now. Right here.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="pxp-user-modal p-5 m-5">
                            {
                                this.state.register ==false ?
                                    <LoginForm registerHandler={this.registerHandler} />
                                    :
                                    <RegisterForm registerHandler={this.registerHandler}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Login;
