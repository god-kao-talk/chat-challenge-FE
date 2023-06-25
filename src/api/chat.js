import instance from './axios';

export const postChatRoom = async (roomName) => {
  try {
    const response = await instance.post('/chat', {
      roomName: roomName,
    });
    return response;
  } catch (error) {
    console.error('postChatroom Axios Error', error);
    // alert(error.response.data.message);
  }
};

export const getChatRoomList = async () => {
  try {
    const response = await instance.get('/chat/room');
    return response.data;
  } catch (error) {
    console.error('getChatRoomList Axios Error', error);
    // alert(error.response.data.message);
  }
};

export const getChattingList = async (roomCode) => {
  try {
    const response = await instance.get(`/chat/${roomCode}`);
    console.log('채팅방 조회 후 데이터에 대한 출력 : ', response);
    return response;
  } catch (error) {
    console.log('receiveChatRoomInfo Axios Error', error);
    return Promise.reject(error.response.data.message);
  }
};
