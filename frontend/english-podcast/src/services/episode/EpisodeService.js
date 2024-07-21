import axiosInstance from '../../utils/axiosInstance';

export const getEpisodeById = async (id) => {
    try {
        const response = await axiosInstance.get(`/episodes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
