import axios from "./axios/axios.global";
import authHeader from "./auth/auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/notifications";


const getnotifications = ({ search, filters, limit, page }) => {
    //add params ro axios get request
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (filters) params.append("filters", filters);
    if (limit) params.append("limit", limit);
    if (page) params.append("page", page);

    return axios.get(API_URL + "", { headers: authHeader(), params });
};


const getUreadedNotificationsCount = () => {
    return axios.get(API_URL + "/count", { headers: authHeader() });
}


const notificationService = {
    getnotifications,
    getUreadedNotificationsCount
};

export default notificationService;