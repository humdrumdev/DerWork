import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import authService from "./services/auth/auth.service";
const Logout = () => {
    authService.logout();
    const navigate = useNavigate();
    navigate("/login");
    return (
        <div>
            <h1>Logout</h1>
        </div>
    );
  };
  
  export default Logout;