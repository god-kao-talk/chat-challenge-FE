import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isFriendAddedState } from '../recoil/friendState';
import { addFriend } from '../api/friend';
import ProfileImg from './element/ProfileImg';
import Modal from './element/Modal';
import useInput from '../hooks/useInput';
import StFriends from '../style/_friends';
import Portal from '../utils/portal';
import useRandomImgColor from '../hooks/useRandomImgColor';
import useGetFriendList from '../hooks/useGetFriendList';

const Friends = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFriendsAdded, setIsFriendAdded] = useRecoilState(isFriendAddedState);

  const { inputData, setInputData, inputChangeHandler } = useInput();
  const defaultImgColor = useRandomImgColor();
  const { friendList, fetchFriendList } = useGetFriendList();

  const addFriendHandler = async () => {
    try {
      const response = await addFriend(inputData);
      setIsFriendAdded(!isFriendsAdded);
      alert(response.data);
      setInputData('');
      setIsModalOpen(false);
    } catch (error) {
      alert('email을 다시 한 번 확인해주세요.');
    }
  };

  useEffect(() => {
    fetchFriendList();
  }, [isFriendsAdded]);

  return (
    <StFriends>
      <nav>
        <button className='addFriends' onClick={() => setIsModalOpen(true)}>
          친구 추가하기
        </button>
      </nav>
      <section>
        <h2>모든 친구 - {friendList.length}명</h2>
        <ul>
          {friendList?.map((friend) => (
            <li key={friend.key}>
              <ProfileImg imgUrl={friend.imageUrl} defaultImgColor={defaultImgColor} />
              <p>
                {friend.nickname}
                <span>{friend.email}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
      <Portal>
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          inputData={inputData}
          inputChangeHandler={inputChangeHandler}
          buttonClickHandler={addFriendHandler}
          title='친구 추가'
          description='사용자 email을 사용하여 친구를 추가할 수 있어요.'
          label='사용자 email'
          buttonContent='친구 추가하기'
          id='addFriend'
          inputType='email'
        />
      </Portal>
    </StFriends>
  );
};

export default Friends;
