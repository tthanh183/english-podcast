import axios from 'axios'

const baseURL = "http://localhost:8080";

export const getPodcasts = async (page, search = "") => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/api/podcasts`, {
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                page: page - 1,
                search: search,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const createPodcast = async (podcast) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${baseURL}/api/podcasts`, podcast, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const updatePodcast = async (id, podcast) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.put(`${baseURL}/api/podcasts/${id}`, podcast, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const deletePodcast = async (id) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.delete(`${baseURL}/api/podcasts/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}