import axios from "./axios/axios.global"
const API_URL = process.env.REACT_APP_API_URL + "/userskills";
import authHeader from "./auth/auth-header";


const addSkill = (skill) => {
    return axios.post(API_URL, skill, { headers: authHeader() });
}

const updateSkill = (skill) => {
    return axios.patch(API_URL + "/" + skill.id, skill, { headers: authHeader() });
}

const getSkills = ({ start }) => {
    //add params ro axios get request
    const params = new URLSearchParams();
    if (start) params.append("start", start);
    return axios.get(API_URL + "", { headers: authHeader(), params });
}

const deleteSkill = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() });
}

const skillService = {
    getSkills,
    updateSkill,
    deleteSkill,
    addSkill
}

export default skillService;