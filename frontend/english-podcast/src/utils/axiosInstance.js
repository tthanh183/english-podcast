// import axios from 'axios';
// import {toast} from "react-toastify";

// const apiUrl = "http://localhost:8080"

// const axiosInstance = axios.create({
//   baseURL: `${apiUrl}/api`,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("token")
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.error('Lỗi 401: Unauthorized');
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         localStorage.removeItem('fullName');
//       toast.warning("Đã hết phiên đăng nhập");
//       setTimeout(() => {
//         window.location.href = '/login';
//       }, 3000);
//     }else if(error.code === "ERR_NETWORK"){
//       toast.error("Máy chủ đang gặp sự cố !");
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;