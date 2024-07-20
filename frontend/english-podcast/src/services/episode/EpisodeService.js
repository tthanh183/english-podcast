import axiosInstance from '../../utils/axiosInstance';

export const getEpisodes = async (id, page, search = "") => {
    try {
        const response = await axiosInstance.get(`/podcasts/${id}/episodes`, {
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
        const response = await axiosInstance.post(`/podcasts/${id}/episodes`, episode);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateEpisode = async (podcastId, episodeId, episode) => {
    try {
        const response = await axiosInstance.put(`/podcasts/${podcastId}/episodes/${episodeId}`, episode);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteEpisode = async (podcastId, episodeId) => {
    try {
        const response = await axiosInstance.delete(`/podcasts/${podcastId}/episodes/${episodeId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
