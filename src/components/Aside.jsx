import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import StAside from '../style/_aside';
import { BsPlusLg } from 'react-icons/bs';
import { TfiClose } from 'react-icons/tfi';
import logo from '../img/discord.svg';
import Portal from '../utils/portal';
import { getChatRoomList, postChatRoom } from '../api/chat';
import { styled } from 'styled-components';

const Aside = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { inputData, inputChangeHandler } = useInput();
  const [chatRoomList, setChatRoomList] = useState(null);

  const postChatRoomSubmitHandler = async () => {
    try {
      await postChatRoom(inputData);
      navigate('/chat');
    } catch (error) {
      console.error('postChatroom Axios Error', error);
      alert('네트워크 에러가 발생해 채팅방을 생성하는데 실패했습니다.');
    }
  };

  const makeChatRoom = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchChatroomList = async () => {
      const chatRoomList = await getChatRoomList();
      setChatRoomList(chatRoomList);
    };

    fetchChatroomList();
  }, []);

  useEffect(() => {
    const fetchChatroomListOnChange = async () => {
      const chatRoomList = await getChatRoomList();
      console.log(chatRoomList);
    };

    fetchChatroomListOnChange();
  }, [chatRoomList]);

  return (
    <>
      <StAside>
        <Link to='/Main'>
          <img src={logo} alt='메인페이지' style={{ width: '48px', height: '48px' }} />
        </Link>
        <button type='button' onClick={() => makeChatRoom()}>
          <BsPlusLg />
        </button>
        <ul>
          {chatRoomList &&
            chatRoomList.map((room) => (
              <li key={room.roomCode}>
                <p>{room.roomName}</p>
              </li>
            ))}
        </ul>
      </StAside>
      <Portal>
        <div id='modalbg' className={isModalOpen === true ? 'open' : ''}>
          <ChatRoomNameModal className='modal'>
            <TfiClose className='modalClose' onClick={() => setIsModalOpen(false)} />
            <ChatRoomCreateForm>
              <div>
                <h2>채팅방 추가</h2>
                <p>
                  채팅방은 나와 친구들이 함께 어울리는 공간입니다. <br />내 서버를 만들고 대화를
                  시작해보세요!
                </p>
              </div>
              <ChatRoomNameInput>
                <label htmlFor='chatroomName'>서버 이름</label>
                <input
                  type='text'
                  id='chatroomName'
                  value={inputData}
                  onChange={inputChangeHandler}
                />
              </ChatRoomNameInput>
              <ChatRoomNameSubmit
                type='button'
                onClick={() => postChatRoomSubmitHandler(inputData)}
              >
                채팅방 생성
              </ChatRoomNameSubmit>
            </ChatRoomCreateForm>
          </ChatRoomNameModal>
        </div>
      </Portal>
    </>
  );
};

export default Aside;

const ChatRoomNameModal = styled.div``;

const ChatRoomCreateForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 40px);
  margin-top: 30px;
  & h2 {
    text-align: center;
    padding-bottom: 5px;
  }
  & p {
    text-align: center;
  }
`;

const ChatRoomNameInput = styled.div`
  & label {
    display: block;
    text-align: left;
    padding-bottom: 10px;
  }
  & input {
    width: 100%;
    height: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    background-color: #e3e5e8;
    margin-right: 15px;
  }
`;

const ChatRoomNameSubmit = styled.button`
  width: 150px;
  height: 40px;
  padding: 0 25px;
  border-radius: 5px;
  background-color: #5865f2;
  margin-left: calc(100% - 150px);
`;
