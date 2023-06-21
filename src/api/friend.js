import axios from 'axios';
import { BASE_URL, TOKEN } from '../shared/constants';
import Cookies from 'js-cookie';

const RESOURCE = '/users/friend';
const accesstoken = Cookies.get(TOKEN.ACCESS_TOKEN);

export const getFriendList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${RESOURCE}`, {
      headers: {
        Authorization: accesstoken,
      },
    });

    return response.data;
  } catch (error) {
    console.error('getFriendList Axios Error', error);
    alert(error.response.data.message);
  }
};
