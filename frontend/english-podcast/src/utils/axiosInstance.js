import axios from 'axios';
import { toast } from "react-toastify";

const apiUrl = "http://localhost:8080";

const protectedRoutes = ['/channel', '/channel/podcast'];

const axiosInstance = axios.create({
    baseURL: `${apiUrl}/api`,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
            const currentPath = window.location.pathname;
            if (protectedRoutes.includes(currentPath)) {
                localStorage.removeItem("email");
                localStorage.removeItem("name");
                localStorage.removeItem("avatar");
                localStorage.removeItem("roles");
                localStorage.removeItem("token");
                toast.warn("Đã hết phiên đăng nhập");
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            }
        } else if (error.code === "ERR_NETWORK") {
            toast.error("Máy chủ đang gặp sự cố !");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
