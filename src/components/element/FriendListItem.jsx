import { styled } from 'styled-components';
import ProfileImg from './ProfileImg';
import useRandomImgColor from '../../hooks/useRandomImgColor';

const FriendListItem = ({ friend }) => {
  const defaultImgColor = useRandomImgColor();

  return (
    <li>
      <ProfileImg imgUrl={friend.imageUrl} defaultImgColor={defaultImgColor} />
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
