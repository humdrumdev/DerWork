import React, { Component } from "react";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
        loading: true,
        };
    }
    
    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <form>
                    {/* <label> First Name: </label>
                    <input type="text" name="firstName" />
                    <label> Last Name: </label>
                    <input type="text" name="lastName" />
                    <label> Email: </label>
                    <input type="text" name="email" />
                    <label> Password: </label>
                    <input type="text" name="password" />
                    <label> Confirm Password: </label> */}
                    <input type="text" name="confirmPassword" />
                    <input type="submit" value="Submit" />
                </form>

            </div>
        );
    }
}

export default SignUp;
