import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ChatRoom from '../pages/ChatRoom';
import UserList from '../pages/UserList';
import MyPage from '../pages/MyPage';
import Main from '../pages/Main';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import RedirectionGoogleLogin from '../components/RedirectionGoogleLogin';
import { PATH_URL } from './constants';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PATH_URL.LOGIN} element={<LoginPage />} />
          <Route path={PATH_URL.REDIRECT_GOOGLE_LOGIN} element={<RedirectionGoogleLogin />} />
          <Route path={PATH_URL.SIGNUP} element={<SignupPage />} />
          {/* <Route path='/ChatRoom/:id' element={<ChatRoom />} />
          <Route path='/userslist' element={<UserList />} />
          <Route path='/MyPage/:id' element={<MyPage />} /> */}
          <Route path={PATH_URL.MAIN} element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
