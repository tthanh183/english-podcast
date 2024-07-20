import axiosInstance from '../../utils/axiosInstance';

export const getPodcasts = async (page, search = "") => {
    try {
        const response = await axiosInstance.get('/podcasts', {
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

export const getPodcastById = async (id) => {
    try {
        const response = await axiosInstance.get(`/podcasts/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const createPodcast = async (podcast) => {
    try {
        const response = await axiosInstance.post('/podcasts', podcast);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updatePodcast = async (id, podcast) => {
    try {
        const response = await axiosInstance.put(`/podcasts/${id}`, podcast);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deletePodcast = async (id) => {
    try {
        const response = await axiosInstance.delete(`/podcasts/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
