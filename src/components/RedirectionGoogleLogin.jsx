import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RedirectionGoogleLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accesstoken = searchParams.get('Authorization');

  const googleLogin = () => {
    Cookies.set('accesstoken', accesstoken);
    navigate('/Main');
  };

  useEffect(() => {
    googleLogin();
  }, []);

  return <></>;
};

export default RedirectionGoogleLogin;
