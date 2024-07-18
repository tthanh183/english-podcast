import axios from 'axios'

const baseURL = "http://localhost:8080";

export const getPodcasts = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${baseURL}/api/podcast`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}