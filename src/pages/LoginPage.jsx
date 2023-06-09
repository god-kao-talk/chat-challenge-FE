import { styled } from 'styled-components';
import * as S from '../style/_auth';
import useInput from '../hooks/useInput';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { BASE_URL, PATH_URL } from '../shared/constants';

const LoginPage = () => {
  const navigate = useNavigate();

  const { inputData: email, inputChangeHandler: emailChangeHandler } = useInput();
  const { inputData: password, inputChangeHandler: passwordChangeHandler } = useInput();

  const inputList = [
    {
      value: 'email',
      label: '이메일',
      inputValue: email,
      onChange: emailChangeHandler,
    },
    {
      value: 'password',
      label: '비밀번호',
      inputValue: password,
      onChange: passwordChangeHandler,
    },
  ];

  const inputDataSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await login({ email, password });
    if (response) {
      alert('로그인이 완료되었습니다.');
      navigate(PATH_URL.MAIN);
    }
  };

  const googleLoginHandler = async () => {
    const GOOGLE_AUTH_URL = `${BASE_URL}/oauth2/authorization/google`;
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <S.AuthPageContainer>
      <S.AuthContainer width='650px' height='450px' padding='30px 30px 0px 30px'>
        <StTitle>돌아오신 것을 환영해요!</StTitle>
        <StSubTitle>다시 만나다니 너무 반가워요!</StSubTitle>
        <S.AuthForm onSubmit={inputDataSubmitHandler} justifycontent='space-evenly'>
          <S.AuthInputContainer>
            {inputList.map((inputItem, index) => (
              <S.AuthInputWrapper key={index}>
                <S.AuthLabel htmlFor={inputItem.value}>{inputItem.label}</S.AuthLabel>
                <S.AuthInput
                  type={inputItem.value}
                  id={inputItem.value}
                  value={inputItem.inputValue || ''}
                  onChange={inputItem.onChange}
                />
              </S.AuthInputWrapper>
            ))}
          </S.AuthInputContainer>
          <S.AuthButtonContainer>
            <StButtonWrapper>
              <S.AuthButton>로그인</S.AuthButton>
              <S.AuthButton type='button' onClick={googleLoginHandler}>
                소셜 로그인
              </S.AuthButton>
            </StButtonWrapper>
            <StSwitchPageWrapper>
              <StSwitchPageDescriptionLabel>계정이 필요한가요? </StSwitchPageDescriptionLabel>
              <Link to='/signup'>
                <StSwitchSignupPageLabel>가입하기</StSwitchSignupPageLabel>
              </Link>
            </StSwitchPageWrapper>
          </S.AuthButtonContainer>
        </S.AuthForm>
      </S.AuthContainer>
    </S.AuthPageContainer>
  );
};

const StTitle = styled.h2`
  margin-bottom: 10px;
`;

const StSubTitle = styled.div`
  color: #a2a5ab;
`;

const StButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StSwitchPageWrapper = styled.div`
  margin-top: 13px;
`;

const StSwitchPageDescriptionLabel = styled.span`
  color: #a2a5ab;
`;

export const StSwitchSignupPageLabel = styled.span`
  color: #4095d9;
  cursor: pointer;
`;

export default LoginPage;
