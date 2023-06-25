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
  const createdDateServerData = new Date(searchData.createdAt);
  const createdDate = createdDateServerData.toLocaleString();
  console.log('되냐??', createdDate);

  return (
    <StSearchListItem>
      <ProfileImg imgUrl={searchData.imageUrl} defaultImgColor='#5865f2' />
      <StTextWrapper>
        <div>
          <StUserName>{searchData.nickname}</StUserName>
          <StDate>{createdDate}</StDate>
        </div>
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
  margin-left: 5px;
  box-sizing: border-box;
  gap: 3px;
`;

const StUserName = styled.span`
  color: white;
  font-size: 15px;
  font-weight: 700;
`;

const StDate = styled.span`
  margin-left: 5px;
  font-size: 13px;
`;

const StMessage = styled.span`
  color: white;
  word-break: break-word;
  font-size: 15px;
`;

export default SearchListItem;
