import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { styled } from 'styled-components';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { getChattingList } from '../api/chat';
import { useQuery, useMutation } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { submitPicture } from '../api/api';
import Cookies from 'js-cookie';
import { over } from 'stompjs';
import ProfileImg from '../components/element/ProfileImg';
import useDecodeJWT from '../hooks/useDecodeJWT';
import { BsFillPlusCircleFill } from 'react-icons/bs';

var stompClient = null;

function Chat() {
  // 입력값 상태관리
  const [input, setInput] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [chatRoomInfo, setChatRoomInfo] = useState({});

  const [whoIAm, setWhoIAm] = useState(null);

  useEffect(() => {
    setWhoIAm(chatRoomInfo.userId);
  }, [chatRoomInfo]);

  // 사용자 정보 불러오기
  const decodedToken = useDecodeJWT();
  const userNickname = decodedToken.nickname;
  const userEmail = decodedToken.email;

  // 스크롤 부분(채팅방 입장시 가장 아래로, 채팅로그가 업데이트 될 때마다 가장 아래로)
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current && (scrollRef.current.scrollTop = scrollRef.current.scrollHeight);
  }, [messageList]);

  // 방 아이디 추출
  const params = useParams();
  const roomCode = params.roomcode;

  //useQuery는 캐싱 기능이 있음. 캐시 키 값에 대해 반복적인 호출을 유발할 수 있음
  const { isLoading, isError, data } = useQuery(
    `/chat/${roomCode}`,
    () => getChattingList(roomCode),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      console.log('data가 있어! : ', data);
      setChatRoomInfo(data);
      setMessageList(data.data);
      console.log('chatRoomInfo 설정중! : ', chatRoomInfo);

      // if (Object.keys(chatRoomInfo).length !== 0) {
      if (data.status === 200) {
        // endpoint로 SockJS 객체, StompClient 객체 생성
        let Sock = new SockJS(`${process.env.REACT_APP_SERVER_URL}/ws-chat`);
        console.log('Sock 설정중! : ', Sock);
        //do Handshake
        stompClient = over(Sock);
        console.log('stompClient 설정중! : ', stompClient);
        // connect(header,연결 성공시 콜백,에러발생시 콜백)
        stompClient.connect({}, onConnected, onError);
      }
    }
  }, [data]);

  const onConnected = () => {
    console.log('roomId에 해당하는 채팅방 구독하기');
    stompClient.subscribe('/topic/chat/room/' + roomCode, function async(message) {
      setMessageList((prev) => [...prev, JSON.parse(message.body)]);
    });

    userJoin();
  };

  const userJoin = () => {
    console.log('채팅방 입장 : ENTER');
    var chatMessage = {
      type: 'ENTER',
      nickname: userNickname,
      email: userEmail,
      roomCode: roomCode,
      message: '',
    };
    stompClient.send('/app/chat/enter', {}, JSON.stringify(chatMessage));
  };

  const onError = (err) => {
    console.log(err);
  };

  const sendMsg = () => {
    const messageInfo = {
      type: 'TALK',
      nickname: userNickname,
      email: userEmail,
      roomCode: roomCode,
      message: input,
    };
    input &&
      messageInfo.message.trim() &&
      stompClient.send('/app/chat/send', {}, JSON.stringify(messageInfo));

    setInput('');
  };
  const [copied, setCopied] = useState(false);

  const handleCopyClipBoard = (text) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      alert('클립보드 복사에 실패하였습니다.');
    }
  };

  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  return (
    <StChat>
      <ChatNav>
        <button
          type='button'
          className={copied === true ? 'success' : ''}
          onClick={() => handleCopyClipBoard(roomCode)}
        >
          <span>#</span>&nbsp;
          {roomCode}
        </button>
      </ChatNav>
      <ChatRoomWrapper>
        <ChatLog ref={scrollRef}>
          {messageList.map((item, index) => (
            <IndividualChat
              whoIAm={whoIAm}
              key={index}
              messagetype={item.type}
              previousId={messageList[index - 1]?.nickname}
              previousType={messageList[index - 1]?.type}
              previousTime={messageList[index - 1]?.createdAt}
              commentUserId={item.nickname}
              commentUserProfileImgUrl={item.profile_image}
              commentDate={item.createdAt}
              commentContent={item.message}
              imageFile={item.image}
            />
          ))}
        </ChatLog>
        <ChatInputArea>
          <input
            type='text'
            value={input}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMsg();
              }
            }}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMsg} className='message-submit'>
            <BsFillPlusCircleFill />
          </button>
        </ChatInputArea>
      </ChatRoomWrapper>
    </StChat>
  );
}

const IndividualChat = ({
  commentDate,
  commentUserId,
  previousType,
  previousId,
  previousTime,
  commentContent,
  messagetype,
}) => {
  return (
    <>
      {messagetype === 'TALK' ? (
        <IndividualChatWrapper
          className={previousType !== 'ENTER' && previousId === commentUserId ? 'hide' : ''}
        >
          <ProfileImage>
            <ProfileImg />
          </ProfileImage>
          <div>
            <div className='commentInfo'>
              <span className='nickname'>{commentUserId}</span>
              {commentDate}
            </div>
            <div>{commentContent}</div>
          </div>
        </IndividualChatWrapper>
      ) : messagetype === 'ENTER' ? (
        <EntranceText>
          <div>{commentContent}</div>
        </EntranceText>
      ) : (
        <EscapeText>
          <div>{commentContent}</div>
        </EscapeText>
      )}
    </>
  );
};

const StChat = styled.div`
  width: 100%;
  height: 100vh;
`;

// 제일 상위의 박스
const ChatRoomWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  padding: 30px;
  box-sizing: border-box;
`;

const ChatNav = styled.nav`
  width: 100%;
  height: 48px;
  border-bottom: 2px solid #232428;
  line-height: 48px;
  text-indent: 20px;
  & button {
    font-size: 16px;
    transition: 0.3s;
  }
  & button.success::after {
    content: '✔️ copied';
    display: inline-block;
    padding-left: 7px;
    color: green;
    font-size: 16px;
  }
  & span {
    color: #ccc;
  }
`;

// 채팅 한 줄
const IndividualChatWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  min-height: 44px;
  .commentInfo {
    font-size: 11px;
    color: #ccc;
    padding-bottom: 5px;
  }
  .commentInfo > .nickname {
    font-size: 15px;
    color: #e2e2e2;
    padding-right: 7px;
  }
  &.hide {
    min-height: initial;
    & .nickname {
      display: none;
    }
    & div:first-child {
      display: none;
    }
    & > div:last-child {
      padding-left: 50px;
    }
  }
`;

const ProfileImage = styled.div`
  div {
    display: inline-block;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 25px;
    overflow: hidden;
  }
`;

const EntranceText = styled.div`
  width: 100%;
  text-align: center;
  color: #fff;
`;

const EscapeText = styled.div`
  width: 100%;
  text-align: center;
  color: #fff;
`;

// 여기도 individual이랑 겹치는 부분인듯
const ChatLog = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    width: 2px;
    background-color: #555;
    border-radius: 3px;
  }
`;

const ChatInputArea = styled.div`
  position: fixed;
  left: 110px;
  bottom: 30px;
  width: calc(100% - 450px);
  display: flex;
  height: 45px;
  background-color: #383a40;
  border-radius: 5px;
  input {
    position: absolute;
    left: 50px;
    width: calc(100% - 70px);
    height: 45px;
    border: none;
    padding: 10px 0;
    box-sizing: border-box;
    font-size: 20px;
    background-color: transparent;
    color: #fff;
    &::-webkit-scrollbar {
      width: 0px;
      background-color: #383a40;
    }
    &::-webkit-scrollbar-thumb {
      width: 2px;
      background-color: #555;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
      background-color: #383a40;
    }
  }
  .message-submit {
    position: absolute;
    top: 12px;
    left: 15px;
    width: 30px;
    height: 30px;
    font-size: 25px;
    color: #b5bac1;
  }
`;

export default Chat;
