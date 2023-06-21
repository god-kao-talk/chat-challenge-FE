import axios from 'axios';
import { getAccessToken } from './getToken';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const updatedConfig = { ...config };
    const accessToken = await getAccessToken();

    if (accessToken) {
      updatedConfig.headers.Authorization = accessToken;
    }

    return updatedConfig;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.message);
    return Promise.reject(error);
  }
);

export default instance;
