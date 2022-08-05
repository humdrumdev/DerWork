import axios from "./axios/axios.global";
import authHeader from "./auth/auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/categories";

const getCategories = () => {
    return axios.get(API_URL);
};

const categorieService = {
    getCategories
};

export default categorieService;