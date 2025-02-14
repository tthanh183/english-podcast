import axiosInstance from '../../utils/axiosInstance';

export const getUser = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getPodcastsByUser = async (page, size, search = "") => {
    try {
        const response = await axiosInstance.get('/users/podcasts', {
            params: {
                page: page - 1,
                size: size,
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
        const response = await axiosInstance.post('/users/podcasts', podcast);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updatePodcast = async (id, podcast) => {
    try {
        const response = await axiosInstance.put(`/users/podcasts/${id}`, podcast);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deletePodcast = async (id) => {
    try {
        const response = await axiosInstance.delete(`/users/podcasts/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

