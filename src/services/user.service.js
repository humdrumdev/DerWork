import axios from "./axios/axios.global";
import authHeader from "./auth/auth-header";

const API_URL = process.env.REACT_APP_API_URL + "";


const setIsCompanyAndStatus = (isCompany, status) => {
    return axios.post(API_URL + "/users/changeCompanyAndStatus", { isCompany, status }, { headers: authHeader() });
}
const getUserFullData = () => {
    return axios.get(API_URL + "/users/me", { headers: authHeader() });
};

const getUserFullDataById = (id) => {
    return axios.get(API_URL + "/users/" + id, { headers: authHeader() });
};
//update user
const updateUser = (user) => {
    const filedata = new FormData();
    // filedata.append('photo', user.photo);
    // filedata.append('first_name', user.first_name);
    // filedata.append('last_name', user.last_name);
    // filedata.append('email', user.email);
    // filedata.append('phone', user.phone);
    // filedata.append('description', user.description);
    // filedata.append('city', user.city);
    // filedata.append('country', user.country);
    // filedata.append('title', user.title);
    // filedata.append('username', user.username);
    if(user.photo) filedata.append('photo', user.photo);
    if(user.first_name) filedata.append('first_name', user.first_name);
    if(user.last_name) filedata.append('last_name', user.last_name);
    if(user.email) filedata.append('email', user.email);
    if(user.phone) filedata.append('phone', user.phone);
    if(user.description) filedata.append('description', user.description);
    if(user.city) filedata.append('city', user.city);
    if(user.country) filedata.append('country', user.country);
    if(user.title) filedata.append('title', user.title);
    if(user.username) filedata.append('username', user.username);
    
    return axios.patch(API_URL + "/users/user", filedata, { headers: authHeader() });
};

const UpdateCompany = (user) => {
    const filedata = new FormData();
    
    // filedata.append('photo', user.photo);
    // filedata.append('companyname', user.companyname);
    // filedata.append('industry', user.industry);
    // filedata.append('city', user.city);
    // filedata.append('country', user.country);
    // filedata.append('countryCode', user.countryCode);
    // filedata.append('description', user.description);
    // filedata.append('website', user.website);
    // filedata.append('size', user.size);
    // filedata.append('email', user.email);
    // filedata.append('fix', user.fix);
    // filedata.append('address', user.address);
    // filedata.append('founded', user.founded);
    // filedata.append('facebook', user.facebook);
    // filedata.append('instagram', user.instagram);
    // filedata.append('twitter', user.twitter);
    // filedata.append('linkedin', user.linkedin);
    if(user.photo) filedata.append('photo', user.photo);
    if(user.companyname) filedata.append('companyname', user.companyname);
    if(user.prefix) filedata.append('prefix', user.prefix);
    if(user.industry) filedata.append('industry', user.industry);
    if(user.city) filedata.append('city', user.city);
    if(user.country) filedata.append('country', user.country);
    if(user.countryCode) filedata.append('countryCode', user.countryCode);
    if(user.description) filedata.append('description', user.description);
    if(user.website) filedata.append('website', user.website);
    if(user.size) filedata.append('size', user.size);
    if(user.email) filedata.append('email', user.email);
    if(user.fix) filedata.append('fix', user.prefix+user.fix);
    if(user.address) filedata.append('address', user.address);
    if(user.founded) filedata.append('founded', user.founded);
    if(user.facebook) filedata.append('facebook', user.facebook);
    if(user.instagram) filedata.append('instagram', user.instagram);
    if(user.twitter) filedata.append('twitter', user.twitter);
    if(user.linkedin) filedata.append('linkedin', user.linkedin);
    

    return axios.patch(API_URL + "/users/company", filedata, { headers: authHeader() });
};

const updateCompanyNameImage = (user) => {
    const filedata = new FormData();
    filedata.append('photo', user.photo);
    filedata.append('companyname', user.companyname);
    filedata.append('industry', user.industry);
    filedata.append('city', user.city);
    filedata.append('country', user.country);
    filedata.append('countryCode', user.countryCode);
    return axios.patch(API_URL + "/users/companyname", filedata, { headers: authHeader() });
};

const updateUserNameImage = (user) => {
    const filedata = new FormData();
    filedata.append('photo', user.photo);
    filedata.append('first_name', user.first_name);
    filedata.append('last_name', user.last_name);
    filedata.append('title', user.title);
    filedata.append('city', user.city);
    filedata.append('country', user.country);
    filedata.append('countryCode', user.countryCode);
    return axios.patch(API_URL + "/users/usertitle", filedata, { headers: authHeader() });
};

const getUserLocation = () => {
    return axios.get("http://ip-api.com/json");
}
const getCompanies = ({ search, location, category, filters, limit, page }) => {
    //add params ro axios get request
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (location) params.append("location", location);
    if (category) params.append("categorie", category);
    if (filters) params.append("filters", filters);
    if (limit) params.append("limit", +limit);
    if (page) params.append("page", +page);
    return axios.get(API_URL + "/users/companies", { headers: authHeader(), params });
};

const changeCover = (cover) => {
    const filedata = new FormData();
    filedata.append('photo', cover);
    return axios.patch(API_URL + "/users/cover", filedata, { headers: authHeader() });
};
const userService = {
    updateUser,
    UpdateCompany,
    updateCompanyNameImage,
    updateUserNameImage,
    getUserLocation,
    setIsCompanyAndStatus,
    getUserFullData,
    getUserFullDataById,
    getCompanies,
    changeCover
};

export default userService;