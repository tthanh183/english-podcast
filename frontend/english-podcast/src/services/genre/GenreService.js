import axiosInstance from '../../utils/axiosInstance';

export const getGenres = async () => {
    try {
        const response = await axiosInstance.get('/genres');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
