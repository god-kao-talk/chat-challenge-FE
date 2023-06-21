import axios from 'axios';
import { BASE_URL } from '../shared/constants';
import { getAccessToken } from './getToken';

const RESOURCE = '/users/friend';

export const getFriendList = async () => {
  try {
    const accesstoken = await getAccessToken();
    const response = await axios.get(`${BASE_URL}${RESOURCE}`, {
      headers: {
        Authorization: accesstoken,
      },
    });

    return response.data;
  } catch (error) {
    console.error('getFriendList Axios Error', error);
  }
};
