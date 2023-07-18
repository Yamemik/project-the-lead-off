import axios from "axios";

const instance = axios.create({
    baseURL: "https://lothugrale.beget.app",
});

instance.interceptors.request.use(config => {
    config.headers.Authorization = JSON.parse(localStorage.getItem("user")).token;
    return config;
});

export default instance;
