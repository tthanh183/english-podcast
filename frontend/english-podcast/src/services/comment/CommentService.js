import axiosInstance from '../../utils/axiosInstance';

export const addComment = async (data) => {
    try {
        const response = await axiosInstance.post(`/comments`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const getAllComments = async (episodeId) => {
    try{
        const response = await axiosInstance.get(`/comments`, {
            params: {
                episodeId: episodeId
            }
        })
        return response;
    }catch(err){
        throw err;
    }
}