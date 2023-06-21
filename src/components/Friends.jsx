import React, { useState } from 'react';
import StFriends from '../style/_friends';
import List from '../style/_list';
import ProfileImg from './element/ProfileImg';
import Portal from '../utils/portal';
import Modal from './element/Modal';
import useInput from '../hooks/useInput';

const Friends = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { inputData, inputChangeHandler } = useInput();

  const addFriendHandler = () => {};

  return (
    <StFriends>
      <nav>
        <button className='addFriends' onClick={() => setIsModalOpen(true)}>
          친구 추가하기
        </button>
      </nav>
      <section>
        <h2>온라인 친구</h2>
        <List>
          <li>
            <ProfileImg />
            <p>사용자 이름</p>
          </li>
        </List>
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
        />
      </Portal>
    </StFriends>
  );
};

export default Friends;
