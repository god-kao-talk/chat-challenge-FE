import styled from '@emotion/styled';
import * as S from '../style/_auth';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import useInput from '../hooks/useInput';
import { PATH_URL } from '../shared/constants';

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
    if (response) {
      alert('회원가입 완료');
      navigate(PATH_URL.LOGIN);
    }
  };

  return (
    <S.AuthPageContainer>
      <S.AuthContainer width='450px' height='500px' padding='30px'>
        <StTitle>계정 만들기</StTitle>
        <S.AuthForm onSubmit={inputDataSubmitHandler} justifycontent='space-around'>
          <S.AuthInputContainer>
            {inputList.map((inputItem, index) => (
              <S.AuthInputWrapper key={index}>
                <S.AuthLabel htmlFor={inputItem.value}>{inputItem.label}</S.AuthLabel>
                <S.AuthInput
                  type={inputItem.type}
                  id={inputItem.value}
                  value={inputItem.inputValue || ''}
                  onChange={inputItem.onChange}
                />
              </S.AuthInputWrapper>
            ))}
          </S.AuthInputContainer>
          <S.AuthButtonContainer>
            <S.AuthButton>계속하기</S.AuthButton>
            <Link to={PATH_URL.LOGIN}>
              <StToLoginPageLabel>이미 계정이 있으신가요?</StToLoginPageLabel>
            </Link>
          </S.AuthButtonContainer>
        </S.AuthForm>
      </S.AuthContainer>
    </S.AuthPageContainer>
  );
};

const StTitle = styled.h1``;

const StToLoginPageLabel = styled.div`
  color: #4095d9;
  cursor: pointer;
  margin-top: 10px;
`;

export default SignupPage;
