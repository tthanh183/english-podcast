import axiosInstance from '../../utils/axiosInstance';

export const getNotifications = async () => {
    try {
        const response = await axiosInstance.get('/notifications');
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
};

export const markAllAsRead = async () => {
    try {
        await axiosInstance.post('/notifications/readAll', null);
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
        throw error;
    }
}
