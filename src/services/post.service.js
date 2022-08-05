import axios from "./axios/axios.global";
import authHeader from "./auth/auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/jobs";

const getAllPublicPosts = () => {
    return axios.get(API_URL + "/public");
};

const getAllPrivatePosts = () => {
    return axios.get(API_URL + "/private", { headers: authHeader() });
};

const postService = {
    getAllPublicPosts,
    getAllPrivatePosts,
};

export default postService;