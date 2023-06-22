import instance from './axios';

const RESOURCE = '/users/friend';

export const getFriendList = async () => {
  try {
    const response = await instance.get(RESOURCE);
    return response.data;
  } catch (error) {
    console.error('getFriendList Axios Error', error);
  }
};

export const addFriend = async (email) => {
  try {
    const response = await instance.post(RESOURCE, { email });
    return response;
  } catch (error) {
    console.error('addFriend Axios Error', error);
  }
};
