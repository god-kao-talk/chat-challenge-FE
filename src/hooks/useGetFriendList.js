import { useState } from 'react';
import { getFriendList } from '../api/friend';

const useGetFriendList = () => {
  const [friendList, setFriendList] = useState(null);

  const fetchFriendList = async () => {
    const friendListServerData = await getFriendList();
    setFriendList(friendListServerData);
  };

  return { friendList, fetchFriendList };
};

export default useGetFriendList;
