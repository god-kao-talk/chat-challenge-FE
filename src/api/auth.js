import axios from 'axios';
import { BASE_URL } from '../shared/constants';

export const signup = async (inputData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, inputData);
    return response;
  } catch (error) {
    console.error('Signup Axios Error', error);
    alert(error.response.data.message);
  }
};
