import jwt_decode from "jwt-decode";
import authService from "./auth.service";

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
        
        return { Authorization: 'Bearer ' + user.token };
        // return { "x-auth-token": user.accessToken };
    } else {
        return {};
    }
}