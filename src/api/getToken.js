import Cookies from 'js-cookie';
import { TOKEN } from '../shared/constants';

export const getAccessToken = () => {
  return new Promise((resolve) => resolve(Cookies.get(TOKEN.ACCESS_TOKEN)));
};
