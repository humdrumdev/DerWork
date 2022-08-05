import axios from "./axios/axios.global"
const API_URL = process.env.REACT_APP_API_URL + "/experiences";
import authHeader from "./auth/auth-header";


const addExperience = (experience) => {
    return axios.post(API_URL, experience, { headers: authHeader() });
}

const updateExperience = (experience) => {
    return axios.patch(API_URL + "/" + experience.id, experience, { headers: authHeader() });
}

const getExperiences = ({ start }) => {
    //add params ro axios get request
    const params = new URLSearchParams();
    if (start) params.append("start", start);
    return axios.get(API_URL + "", { headers: authHeader(), params });
}

const deleteExperience = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() });
}

const experienceService = {
    getExperiences,
    updateExperience,
    deleteExperience,
    addExperience
}

export default experienceService;