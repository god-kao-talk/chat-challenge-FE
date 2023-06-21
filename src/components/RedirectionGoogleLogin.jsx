import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOKEN } from '../shared/constants';

const RedirectionGoogleLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accesstoken = searchParams.get('Authorization');

  const googleLogin = () => {
    Cookies.set(TOKEN.ACCESS_TOKEN, accesstoken);
    navigate('/Main');
    alert('로그인이 완료되었습니다.');
  };

  useEffect(() => {
    googleLogin();
  }, []);

  return <></>;
};

export default RedirectionGoogleLogin;
