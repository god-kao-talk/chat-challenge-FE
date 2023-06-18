import styled from '@emotion/styled';
import * as S from '../style/_auth';

const SignupPage = () => {
  return (
    <S.AuthPageContainer>
      <S.AuthContainer>
        <StTitle>계정 만들기</StTitle>
        <StForm>
          <StInputContainer>
            <StInputWrapper>
              <StLabel htmlFor='email'>이메일</StLabel>
              <StInput type='email' id='email' />
            </StInputWrapper>
            <StInputWrapper>
              <StLabel htmlFor='nickname'>사용자명</StLabel>
              <StInput id='nickname' />
            </StInputWrapper>
            <StInputWrapper>
              <StLabel htmlFor='password'>비밀번호</StLabel>
              <StInput type='password' id='password' />
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
  font-size: 20px;
  padding: 5px 7px;
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
