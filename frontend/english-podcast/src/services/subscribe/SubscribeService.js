import axiosInstance from '../../utils/axiosInstance';

export const isSubscribed = async (podcastId) => {
    try {
        const response = await axiosInstance.get(`/subscriptions/exists`, {
            params: {
                podcastId: podcastId    
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const toggleSubscription = async (podcastId) => {
    try{
        const response = await axiosInstance.post(`/subscriptions`,null , {
            params: {
                podcastId: podcastId
            }
        })
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