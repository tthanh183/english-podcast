import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

const baseURL = "http://localhost:8080";

export const login = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/api/auth/login`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const register = async (data) => {
    try{
        const response = await axios.post(`${baseURL}/api/auth/register`, userData)
        return response.data;
    }catch(err){
        throw err;
    }
}