import axios from 'axios'

const baseURL = "http://localhost:8080";

export const getGenres = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${baseURL}/api/genres`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}