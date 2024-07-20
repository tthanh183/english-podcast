import axios from 'axios'

const baseURL = "http://localhost:8080";

export const getEpisodes = async (id, page, search = "") => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/api/podcasts/${id}/episodes`, {
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

export const createEpisode = async (id, episode) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${baseURL}/api/podcasts/${id}/episodes`, episode, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const updateEpisode = async (podcastId,episodeId, episode) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.put(`${baseURL}/api/podcasts/${podcastId}/episodes/${episodeId}`
        ,episode, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const deleteEpisode = async (podcastId,episodeId) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.delete(`${baseURL}/api/podcasts/${podcastId}/episodes/${episodeId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}