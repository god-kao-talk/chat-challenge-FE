import React, { useEffect, useState } from 'react'

const Chat = () => {

  const [searchInputValue, setSearchInputValue] = useState('');

  const inputChangeHandler = (event) => {
    setSearchInputValue(event.target.value);
  }

  // 임시 room code


  // 채팅서버 구독
//   useEffect(() => {
//     if (data) {
//       console.log("data가 있어! : ", data)
//       setChatRoomInfo(data);
//       setMessageList(data.chatList);
//       console.log("chatRoomInfo 설정중! : ", chatRoomInfo)

//       if (Object.keys(chatRoomInfo).length !== 0) {
//         // endpoint로 SockJS 객체, StompClient 객체 생성
//         let Sock = new SockJS(`${process.env.REACT_APP_SERVER_URL}/ws-chat`);
//         console.log("Sock 설정중! : ", Sock)
//         //do Handshake
//         stompClient = over(Sock);
//         console.log("stompClient 설정중! : ", stompClient)
//         // connect(header,연결 성공시 콜백,에러발생시 콜백)
//         stompClient.connect({},onConnected, onError);
//       }
//     }
//   }, [data, chatRoomInfo]);

  return (
    <Chat>
        <nav>
            <button># 채팅방 제목</button>
            <input type="text" value={searchInputValue} placeholder='검색하기' onChange={() =>inputChangeHandler()} />
        </nav>
        <section>
            <div className='myChat'>

            </div>
            <div className='otherChat'>

            </div>
        </section>
    </Chat>
  )     
}

export default Chat