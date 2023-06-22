import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isFriendAddedState } from '../recoil/friendState';
import { getFriendList } from '../api/friend';
import useDecodeJWT from '../hooks/useDecodeJWT';
import ProfileImg from './element/ProfileImg';
import FriendListItem from './element/FriendListItem';
import List from '../style/_list';
import StProfile from '../style/_profile';

const Profile = () => {
  const [friendList, setFriendList] = useState(null);
  const isFriendsAdded = useRecoilValue(isFriendAddedState);

  const decodedToken = useDecodeJWT();
  const userNickname = decodedToken.nickname;
  const userEmail = decodedToken.email;
  const userImg = decodedToken.imageUrl;

  const fetchFriendList = async () => {
    const friendListServerData = await getFriendList();
    setFriendList(friendListServerData);
  };

  useEffect(() => {
    fetchFriendList();
  }, [isFriendsAdded]);

  return (
    <StProfile>
      <div className='profile'>
        <ProfileImg imgUrl={userImg} />
        <p>
          {userNickname}
          <span>{userEmail}</span>
        </p>
      </div>
      <section className='friendsList'>
        <h2>친구 목록</h2>
        <List>
          {friendList &&
            friendList.map((friend) => <FriendListItem key={friend.id} friend={friend} />)}
        </List>
      </section>
    </StProfile>
  );
};

export default Profile;
