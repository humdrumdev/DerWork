import axios from "./../axios/axios.global";
import jwt_decode from "jwt-decode";
import userImage from '../../assets/user.svg';
import authHeader  from "./auth-header";
const API_URL = process.env.REACT_APP_API_URL + "/auth";

const signup = (email, password) => {
    return axios
        .post(API_URL + "/signup", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                if (!response.data.photo) {
                    response.data.photo = userImage
                }
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "/signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                if (!response.data.photo) {
                    response.data.photo = userImage
                }
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const loginGoogle = (token) => {
    return axios
        .post(API_URL + "/google", { token })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

//get user id from token
const getUserId = () => {

    const user = getCurrentUser()?.token;
    if (user) {
        //jwt_decode
        const decoded = jwt_decode(user);
        console.log(decoded);
        return decoded.id;
    }
    return null;
};
const changePassword = (password, newPassword) => {
    return axios.post(API_URL + "/changePassword", { password, newPassword }, { headers: authHeader() });
}
//refresh token
// const refreshToken = () => {
//     const user = getCurrentUser();
//     if (user) {
//         return axios
//             .post(API_URL + "/refresh", {
//                 token: user.token,
//             })
//             .then((response) => {
//                 if (response.data.token) {
//                     localStorage.setItem("user", JSON.stringify(response.data));
//                 }
//                 return response.data;
//             });
//     }
// }

const authService = {
    loginGoogle,
    signup,
    login,
    logout,
    getCurrentUser,
    // refreshToken,
    getUserId,
    changePassword,
};

export default authService;