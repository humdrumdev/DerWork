import axios from "./axios/axios.global";
import authHeader from "./auth/auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/messages";
const API_URL_CHAT = process.env.REACT_APP_API_URL + "/chats";


const getchat = () => {
    //add params ro axios get request
    return axios.get(API_URL_CHAT, { headers: authHeader() });
};

const getMessagesByChatId = (chatId) => {
    //add params ro axios get request
    return axios.get(API_URL_CHAT + '/' + chatId, { headers: authHeader() });
}

const sendMessage = (message, userId, chatId) => {

    return axios.post(API_URL, { message, userId, chatId }, { headers: authHeader() });
}

const getUnreadMessagesCount = () => {
    return axios.post(API_URL_CHAT + '/unread', {}, { headers: authHeader() });
}



const messageService = {
    getchat,
    sendMessage,
    getMessagesByChatId,
    getUnreadMessagesCount
};

export default messageService;