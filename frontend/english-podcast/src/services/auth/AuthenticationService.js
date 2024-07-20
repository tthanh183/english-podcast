import axiosInstance from '../../utils/axiosInstance';

export const login = async (data) => {
    try {
        const response = await axiosInstance.post(`/auth/login`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const register = async (data) => {
    try{
        const response = await axios.post(`/auth/register`, userData)
        return response.data;
    }catch(err){
        throw err;
    }
}