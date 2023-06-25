import { styled } from 'styled-components';
import logo from '../../img/discord.svg';
import ProfileImg from './ProfileImg';

const SearchListItem = ({ searchData }) => {
  //   createdAt: null
  // email: "hina@naver.com"
  // message: "test"
  // nickname: "히나"
  // roomCode: "63cf36a8-e09a-4fc1-a5e4-2b100a8f14d0"
  // type: "TALK"

  return (
    <StSearchListItem>
      {/* <ProfileImg imgUrl={searchList.} defaultImgColor={} /> */}
      <img src={logo} alt='user default profile' style={{ width: '48px', height: '48px' }} />
      <StTextWrapper>
        <StUserName>{searchData.nickname}</StUserName>
        <StMessage>{searchData.message}</StMessage>
      </StTextWrapper>
    </StSearchListItem>
  );
};

const StSearchListItem = styled.li`
  width: 280px;
  display: flex;
  background-color: #313338;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

const StTextWrapper = styled.div`
  width: calc(100% - 58px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  box-sizing: border-box;
`;

const StUserName = styled.span`
  color: white;
  font-weight: 700;
`;

const StMessage = styled.span`
  color: white;
  word-break: break-word;
`;

export default SearchListItem;
