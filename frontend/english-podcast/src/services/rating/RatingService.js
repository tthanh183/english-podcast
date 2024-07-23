import axiosInstance from '../../utils/axiosInstance';

export const getRating = async (episodeId) => {
    try {
        const response = await axiosInstance.get(`/ratings`, {
            params: {
                episodeId: episodeId    
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const addRating = async (episodeId, stars) => {
    try{
        const response = await axiosInstance.post(`/ratings`,null , {
            params: {
                episodeId: episodeId,
                stars: stars
            }
        })
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error);
    }
}

export const findTopRecentSubscribed = async (limit) => {
    try{
        const response = await axiosInstance.get(`/subscriptions`, {
            params: {
                limit: limit
            }
        })
        return response.data;
    }catch(error){
        console.log(error);
    }
}