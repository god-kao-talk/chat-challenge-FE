import { styled } from 'styled-components';
import ProfileImg from './ProfileImg';

const FriendListItem = ({ friend }) => {
  return (
    <li>
      <ProfileImg imgUrl={friend.imageUrl} />
      <StNickname>{friend.nickname}</StNickname>
    </li>
  );
};

const StNickname = styled.p`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default FriendListItem;
