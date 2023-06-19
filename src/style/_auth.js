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
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: #313338;
  border-radius: 10px;
  box-sizing: border-box;
  padding: ${({ padding }) => padding};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifycontent }) => justifycontent};
`;

export const AuthInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AuthInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const AuthLabel = styled.label`
  color: #a2a5ab;
`;

export const AuthInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  background-color: #1e1f22;
  outline: none;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  padding: 10px 8px;
`;

export const AuthButtonContainer = styled.div``;

export const AuthButton = styled.button`
  width: 100%;
  background-color: #5869ea;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
`;
