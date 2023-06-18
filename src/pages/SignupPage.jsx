import styled from '@emotion/styled';
import * as S from '../style/_auth';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import useInput from '../hooks/useInput';

const SignupPage = () => {
  const navigate = useNavigate();

  const { inputData: email, inputChangeHandler: emailChangeHandler } = useInput();
  const { inputData: nickname, inputChangeHandler: nicknameChangeHandler } = useInput();
  const { inputData: password, inputChangeHandler: passwordChangeHandler } = useInput();

  const inputList = [
    {
      value: 'email',
      label: '이메일',
      type: 'email',
      inputValue: email,
      onChange: emailChangeHandler,
    },
    {
      value: 'nickname',
      label: '사용자명',
      type: 'text',
      inputValue: nickname,
      onChange: nicknameChangeHandler,
    },
    {
      value: 'password',
      label: '비밀번호',
      type: 'password',
      inputValue: password,
      onChange: passwordChangeHandler,
    },
  ];

  const inputDataSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await signup({ email, nickname, password });
    response && navigate('/login');
  };

  return (
    <S.AuthPageContainer>
      <S.AuthContainer>
        <StTitle>계정 만들기</StTitle>
        <StForm onSubmit={inputDataSubmitHandler}>
          <StInputContainer>
            <StInputWrapper>
              {inputList.map((inputItem, index) => (
                <div key={index}>
                  <StLabel htmlFor={inputItem.value}>{inputItem.label}</StLabel>
                  <StInput
                    type={inputItem.type}
                    id={inputItem.value}
                    value={inputItem.inputValue}
                    onChange={inputItem.onChange}
                  />
                </div>
              ))}
            </StInputWrapper>
          </StInputContainer>
          <StButton>계속하기</StButton>
        </StForm>
      </S.AuthContainer>
    </S.AuthPageContainer>
  );
};

const StTitle = styled.h1``;

const StForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const StLabel = styled.label``;

const StInput = styled.input`
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

const StButton = styled.button`
  width: 100%;
  background-color: #5869ea;
  border-radius: 5px;
  font-size: 17px;
  font-weight: bold;
  padding: 7px;
`;

export default SignupPage;
