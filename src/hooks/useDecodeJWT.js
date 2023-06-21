import Cookies from 'js-cookie';
import { TOKEN } from '../shared/constants';

const useDecodeJWT = () => {
  const token = Cookies.get(TOKEN.ACCESS_TOKEN)?.replace('Bearer ', '');
  let decodedJWT = null;

  if (token) {
    const base64Payload = token.split('.')[1];
    const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
    decodedJWT = JSON.parse(
      decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      )
    );
  }

  return decodedJWT;
};

export default useDecodeJWT;
