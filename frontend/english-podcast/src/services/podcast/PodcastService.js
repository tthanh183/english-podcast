import axiosInstance from '../../utils/axiosInstance';

export const getPodcasts = async (page, search = "") => {
    try {
        const response = await axiosInstance.get('/podcasts', {
            params: {
                page: page - 1,
                search: search,
            }
        });
        console.log("DM DAY ROI");
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

export const getNewReleasedPodcast = async () => {
    try {
        const response = await axiosInstance.get('/podcasts/new-released');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getEpisodes = async (id, page, size, search = "") => {
    try {
        const response = await axiosInstance.get(`/podcasts/${id}/episodes`, {
            params: {
                page: page - 1,
                size: size,
                search: search,
            }
        });
        return response.data;
    } catch (error) {
        console.log(response.message);
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