import axios from 'axios';
import { BASE_URL } from '../shared/constants';
import Cookies from 'js-cookie';

export const signup = async (inputData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, inputData);
    return response;
  } catch (error) {
    console.error('Signup Axios Error', error);
    alert(error.response.data.message);
  }
};

export const login = async (inputData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, inputData);

    const accesstoken = response.headers.authorization;
    const refreshtoken = response.headers['authorization-refresh'];

    Cookies.set('accesstoken', accesstoken);
    Cookies.set('refreshtoken', refreshtoken);

    return response;
  } catch (error) {
    console.error('Login Axios Error', error);
    alert(error.response.data);
  }
};
