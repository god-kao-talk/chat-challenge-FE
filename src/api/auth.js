import { TOKEN } from '../shared/constants';
import Cookies from 'js-cookie';
import instance from './axios';

export const signup = async (inputData) => {
  try {
    const response = await instance.post('/users/signup', inputData);
    return response;
  } catch (error) {
    console.error('Signup Axios Error', error);
    alert(error.response.data.message);
  }
};

export const login = async (inputData) => {
  try {
    const response = await instance.post('/login', inputData);

    const accesstoken = response.headers.authorization;
    const refreshtoken = response.headers['authorization-refresh'];

    Cookies.set(TOKEN.ACCESS_TOKEN, accesstoken);
    Cookies.set(TOKEN.REFRESH_TOKEN, refreshtoken);

    return response;
  } catch (error) {
    console.error('Login Axios Error', error);
    alert(error.response.data);
  }
};
