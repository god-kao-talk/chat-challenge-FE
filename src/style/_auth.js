import { styled } from 'styled-components';
import backgroundImage from '../img/auth-background-image.png';

export const AuthPageContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url(${backgroundImage});
  background-size: cover;
`;

export const AuthContainer = styled.div`
  width: 400px;
  height: 450px;
  background-color: #313338;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
