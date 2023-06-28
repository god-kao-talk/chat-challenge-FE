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
import { useNavigate } from 'react-router-dom';
import { addChatRoom, getChatRoomList } from '../api/chat';
import { chatroomListState } from '../recoil/chatroomList';

const Friends = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [isFriendsAdded, setIsFriendAdded] = useRecoilState(isFriendAddedState);
    const [isChatRoomUpdate, setIsChatRoomUpdate] = useRecoilState(chatroomListState);

    const { inputData, setInputData, inputChangeHandler } = useInput();
    const defaultImgColor = useRandomImgColor();
    const { friendList, fetchFriendList } = useGetFriendList();

    const fetchChatroomList = async () => {
        const chatRoomList = await getChatRoomList();
        setIsChatRoomUpdate(chatRoomList);
    };

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

    const addChatRoomHandler = async (roomcode) => {
        try {
            const response = await addChatRoom(inputData);
            setIsFriendAdded(!isFriendsAdded);
            alert(`"${response.data.roomName}" 방이 추가되었습니다.`);
            setInputData('');
            setIsModalOpen(false);
            fetchChatroomList();
            navigate(`/chat/${roomcode}`);
        } catch (error) {
            alert('유효한 roodCode가 아닙니다.');
        }
    };

    useEffect(() => {
        fetchFriendList();
    }, [isFriendsAdded]);

    return (
        <StFriends>
            <nav>
                <button className="addFriends" onClick={() => setIsModalOpen(true)}>
                    친구 추가하기
                </button>
                <button className="addChatroom" onClick={() => setIsChatModalOpen(true)}>
                    채팅방 추가하기
                </button>
            </nav>
            <section>
                <h2>모든 친구 - {friendList?.length}명</h2>
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
                    title="친구 추가"
                    description="사용자 email을 사용하여 친구를 추가할 수 있어요."
                    label="사용자 email"
                    buttonContent="친구 추가하기"
                    id="addFriend"
                    inputType="email"
                />
                <Modal
                    isModalOpen={isChatModalOpen}
                    setIsModalOpen={setIsChatModalOpen}
                    inputData={inputData}
                    inputChangeHandler={inputChangeHandler}
                    buttonClickHandler={addChatRoomHandler}
                    title="채팅방 추가"
                    description="채팅방 code를 입력하여 채팅방을 추가할 수 있어요."
                    label="채팅방 roomCode"
                    buttonContent="채팅방 추가하기"
                    id="addChatRoom"
                    inputType="text"
                />
            </Portal>
        </StFriends>
    );
};

export default Friends;
