import React, { useState } from 'react';
import List from '../style/_list';
import StProfile from '../style/_profile';
import ProfileImg from './element/ProfileImg';
import { getFriendList } from '../api/friend';
import FriendListItem from './element/FriendListItem';
import useDecodeJWT from '../hooks/useDecodeJWT';

const Profile = () => {
  const [friendList, setFriendList] = useState([]);

  const decodedToken = useDecodeJWT();
  const userEmail = decodedToken.email;

  const fetchFriendList = async () => {
    const friendListServerData = await getFriendList();
    setFriendList(friendListServerData);
  };

  useState(() => {
    fetchFriendList();
  }, []);

  return (
    <StProfile>
      <div className='profile'>
        <ProfileImg />
        <p>
          사용자 이름
          <span>사용자 소개</span>
        </p>
      </div>
      <section className='friendsList'>
        <h2>친구 목록</h2>
        <List>
          {friendList.map((friend) => (
            <FriendListItem key={friend.id} friend={friend} />
          ))}
        </List>
      </section>
    </StProfile>
  );
};

export default Profile;
