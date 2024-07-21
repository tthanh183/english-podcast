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

export const getNewReleasedPodcast = async () => {
    try {
        const response = await axiosInstance.get('/podcasts/new-released');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}