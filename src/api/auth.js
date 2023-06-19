import axios from 'axios';
import { BASE_URL } from '../shared/constants';

const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

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

    onLoginSuccess(response);

    return response;
  } catch (error) {
    console.error('Login Axios Error', error);
    alert(error.response.data);
  }
};

// TODO: refresh token secure httpOnly 쿠키로 받아올 경우 작성
// const onSilentRefresh = (data) => {
// }

const onLoginSuccess = (response) => {
  const { authorization } = response.headers;
  axios.defaults.headers.common['Authorization'] = authorization;

  // setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
};
