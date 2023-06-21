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
