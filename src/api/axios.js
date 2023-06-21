import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});


instance.interceptors.request.use(
  (config) => {
    const updatedConfig = { ...config };
    const accessToken = Cookies.get('accesstoken');

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

export default instance