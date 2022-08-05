import axios from 'axios';
import authService from '../auth/auth.service';
import userImage from '../../assets/user.svg';


//axios interceptor for token refresh
axios.interceptors.response.use(
    (response) => {
        console.log('working - ', response.request.responseURL);
        return response;
    }
    ,
    (error) => {
        if (error.response && error.response.status === 401) {
            
            const refreshToken = authService.getCurrentUser()?.refreshToken;
            if (refreshToken) {
                // alert('token expired');
                return axios
                    .post(process.env.REACT_APP_API_URL + "/auth/refresh", {
                        token: refreshToken,
                    })
                    .then((response) => {
                        if (response.data.token) {
                            if (!response.data.photo) {
                                response.data.photo = userImage
                            }
                            localStorage.setItem("user", JSON.stringify(response.data));
                            const config = error.config;
                            config.headers['Authorization'] = 'Bearer ' + response.data.token;
                            return axios(config);
                        }
                        else
                            //logout
                            authService.logout();
                        //resend the request with the new token
                        

                        return Promise.reject(error);
                    });
            }
        }
        if (error.response && error.response.status === 404) {
            //logout
            authService.logout();
            return Promise.reject(error);
        }
        

        return Promise.reject(error);
    }
);

export default axios;