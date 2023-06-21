import React, { useState } from 'react';
import List from '../style/_list';
import StProfile from '../style/_profile';
import ProfileImg from './element/ProfileImg';
import { getFriendList } from '../api/friend';
import FriendListItem from './element/FriendListItem';
import useDecodeJWT from '../hooks/useDecodeJWT';

const Profile = () => {
  const [friendList, setFriendList] = useState(null);

  const decodedToken = useDecodeJWT();
  const userNickname = decodedToken.nickname;
  const userEmail = decodedToken.email;

  const fetchFriendList = async () => {
    const friendListServerData = await getFriendList();
    setFriendList(friendListServerData);
  };

  useState(() => {
    fetchFriendList();
  }, [friendList]);

  return (
    <StProfile>
      <div className='profile'>
        <ProfileImg />
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
