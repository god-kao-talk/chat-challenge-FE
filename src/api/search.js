import instance from './axios';

export const getSearchMessage = async (roomCode, message) => {
    try {
        const response = await instance.get(`/chat/${roomCode}/${message}`);
        return response.data;
    } catch (error) {
        console.log('getSearchMessage Axios Error', error);
    }
};
