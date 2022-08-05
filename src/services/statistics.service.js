import axios from "./axios/axios.global";
import authHeader from "./auth/auth-header";

const API_URL = process.env.REACT_APP_API_URL + "";




//get jobs statistics
const getJobsStatistics = () => {
    return axios.get(API_URL + "/jobs/statistics", { headers: authHeader() });
};


const statisticsService = {
    getJobsStatistics,
};

export default statisticsService;