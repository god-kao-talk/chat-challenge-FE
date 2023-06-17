// import React, { useEffect } from "react";
// import { useState, useRef } from "react";
// import { styled } from "styled-components";
// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";
// import { receiveChatRoomInfo } from "../api/api";
// import { useQuery, useMutation } from "react-query";
// import { useParams } from "react-router-dom";
// import { submitPicture } from "../api/api";
// import Header from "../components/Header";
// import Cookies from 'js-cookie';
// import {over} from 'stompjs';

// var stompClient =null;
// function ChatRoom() {
//   // console.log("채팅방 환경입니다.")

//   // 입력값 상태관리
//   const [input, setInput] = useState("");
//   const [messageList, setMessageList] = useState([]);
//   const [chatRoomInfo, setChatRoomInfo] = useState({});
//   const [uploadImage, setUploadImage] = useState(null);
//   const [publicChats, setPublicChats] = useState([]);
//   const [privateChats, setPrivateChats] = useState(new Map());

//   // 채팅방에 입장한 본인이 누구인지를 상태관리
//   const [whoIAm, setWhoIAm] = useState(null);
//   useEffect(() => {
//     setWhoIAm(chatRoomInfo.userId);
//   }, [chatRoomInfo]);

//   // 스크롤 부분(채팅방 입장시 가장 아래로, 채팅로그가 업데이트 될 때마다 가장 아래로)
//   const scrollRef = useRef();
//   useEffect(() => {
//     scrollRef.current &&
//       (scrollRef.current.scrollTop = scrollRef.current.scrollHeight);
//   }, [messageList]);

//   // 쿠키에서 토큰 추출
//   const token = Cookies.get('Authorization')

//   // 방 아이디 추출
//   const params = useParams();
//   const roomId = params.id;

//   //useQuery는 캐싱 기능이 있음. 캐시 키 값에 대해 반복적인 호출을 유발할 수 있음
//   const { isLoading, isError, data } = useQuery(
//     `receiveRoomInfo/${roomId}`,
//     () => receiveChatRoomInfo({token, roomId }),
//     { refetchOnWindowFocus: false }
//   );

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

//   const onConnected = () => {
//     console.log("roomId에 해당하는 채팅방 구독하기")
//     // setUserData({...userData,"connected": true});

//     //subscribe(subscribe url,해당 url로 메시지를 받을때마다 실행할 함수)
//     stompClient.subscribe('/topic/chat/room/' + roomId, function async (message) {
//       setMessageList( (prev) => [...prev, JSON.parse(message.body)]);
//     });

//     // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage); 
//     userJoin();
//   }

//   const userJoin=()=>{
//     console.log("채팅방 입장 : ENTER")
//     var chatMessage = {
//       type: "ENTER",
//       sender: chatRoomInfo.sender,
//       userId: chatRoomInfo.userId,
//       roomId: chatRoomInfo.roomId,
//       message: ""
//     };
//     stompClient.send("/app/chat/enter", {}, JSON.stringify(chatMessage));
//   }

//   const onError = (err) => {
//     console.log(err);
//   }

//   const sendMsg = () => {
//     const messageInfo = {
//       type: "TALK",
//       sender: chatRoomInfo.sender,
//       userId: chatRoomInfo.userId,
//       roomId: chatRoomInfo.roomId,
//       message: input.trim(),
//     };
//     input &&
//       messageInfo.message.trim() &&
//       stompClient.send("/app/chat/send", {},  JSON.stringify(messageInfo));

//     setInput("");
//   };

//   const prepareUploadImage = (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("image", file);
//     setUploadImage(formData);
//   };

//   // const submitPictureApi = useMutation(submitPicture, {
//   //   onSuccess: (response) => {
//   //     stompClient.publish({
//   //       destination: "/pub/chat/send",
//   //       headers: { Authentication: token },
//   //       body: JSON.stringify({
//   //         type: "IMAGE",
//   //         sender: chatRoomInfo.sender,
//   //         userId: chatRoomInfo.userId,
//   //         roomId: chatRoomInfo.roomId,
//   //         image: response,
//   //       }),
//   //     });
//   //   },
//   //   onError: () => {
//   //     alert("사진 전송에 실패했습니다.");
//   //   },
//   // });

//   // const uploadImageHandler = () => {
//   //   console.log(uploadImage);
//   //   uploadImage !== null &&
//   //     submitPictureApi.mutate({ token, file: uploadImage });
//   // };

//   if (isLoading) {
//     return <p>로딩중입니다!</p>;
//   }
//   if (isError) {
//     return <p>오류가 발생하였습니다!</p>;
//   }

//   return (
//     <div>
//       <Header />
//       <ChatRoomWrapper>
//         <ChatLog ref={scrollRef}>
//           {messageList.map((item, index) => (
//             <IndividualChat
//               whoIAm={whoIAm}
//               key={index}
//               messagetype={item.type}
//               previousId={messageList[index - 1]?.userId}
//               previousType={messageList[index - 1]?.type}
//               commentUserId={item.userId}
//               commentUserProfileImgUrl={item.profile_image}
//               commentDate={item.date}
//               commentUserName={item.sender}
//               commentContent={item.message}
//               imageFile={item.image}
//             />
//           ))}
//         </ChatLog>
//         <ChatInputArea>
//           <textarea
//             value={input}
//             onKeyUp={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 sendMsg();
//               }
//             }}
//             onChange={(e) => setInput(e.target.value)}
//           ></textarea>
//           <div className='button-pair'>
//             {/* <label htmlFor='fileInput' className='picture-choice-label'>
//               사진선택
//               <input
//                 type='file'
//                 id='fileInput'
//                 className='picture-choice'
//                 onChange={prepareUploadImage}
//               />
//             </label> */}
//             {/* <button onClick={uploadImageHandler} className='picture-submit'>
//               사진전송
//             </button> */}
//             <button onClick={sendMsg} className='message-submit'>
//               전송
//             </button>
//           </div>
//         </ChatInputArea>
//       </ChatRoomWrapper>
//     </div>
//   );
// }

// const IndividualChat = ({
//   previousId,
//   previousType,
//   commentUserId,
//   commentUserProfileImgUrl,
//   commentDate,
//   commentUserName,
//   commentContent,
//   whoIAm,
//   messagetype,
//   imageFile,
// }) => {
//   return (
//     <>
//       {messagetype === "TALK" ? (
//         <IndividualChatWrapper
//           previousId={previousId}
//           previousType={previousType}
//           whoIAm={whoIAm}
//           commentUserId={commentUserId}
//         >
//           <ProfileImage
//             previousId={previousId}
//             previousType={previousType}
//             whoIAm={whoIAm}
//             commentUserId={commentUserId}
//           >
//             <div className='img-wrapper'>
//               <img src={commentUserProfileImgUrl} />
//             </div>
//           </ProfileImage>
//           <div>
//             <p className='chat-name'>{commentUserName}</p>
//             <div className='chat-bubble-wrapper'>
//               <div className='chat-bubble'>
//                 <div>{commentContent}</div>
//               </div>
//               <div className='comment-date'>{commentDate}</div>
//             </div>
//           </div>
//         </IndividualChatWrapper>
//       ) : messagetype === "ENTER" ? (
//         <EntranceText>
//           <div>{commentContent}</div>
//         </EntranceText>
//       ) : messagetype === "LEAVE" ? (
//         <EscapeText>
//           <div>{commentContent}</div>
//         </EscapeText>
//       ) : (
//         <IndividualChatWrapper
//           previousId={previousId}
//           whoIAm={whoIAm}
//           commentUserId={commentUserId}
//         >
//           <ProfileImage
//             previousId={previousId}
//             whoIAm={whoIAm}
//             commentUserId={commentUserId}
//           >
//             <div className='img-wrapper'>
//               <img src={commentUserProfileImgUrl} />
//             </div>
//           </ProfileImage>
//           <div>
//             <p className='chat-name'>{commentUserName}</p>
//             <div className='chat-bubble-wrapper'>
//               <UploadedImage src={imageFile}></UploadedImage>
//               <div className='comment-date'>{commentDate}</div>
//             </div>
//           </div>
//         </IndividualChatWrapper>
//       )}
//     </>
//   );
// };

// const IndividualChatWrapper = styled.div`
//   display: ${(props) =>
//     props.commentUserId == props.whoIAm ? "block" : "flex"};
//   ${(props) => props.commentUserId == props.whoIAm && "align-self : flex-end"};
//   ${(props) =>
//     props.commentUserId == props.whoIAm ? "width : 60%" : "width : 80%"};
//   ${(props) =>
//     props.previousId == props.commentUserId
//       ? "margin : 5px 0 5px 10px"
//       : "margin: 5px 0 5px 10px"};

//   .chat-name {
//     display: ${(props) =>
//       props.commentUserId == props.whoIAm ||
//       (props.previousId == props.commentUserId &&
//         props.previousType !== "ENTER")
//         ? "none"
//         : "block"};
//     color: rgb(80, 80, 80);
//     font-size: 15px;
//     margin: 0 10px 0 10px;
//   }

//   .chat-bubble-wrapper {
//     display: flex;
//     flex-direction: ${(props) =>
//       props.commentUserId == props.whoIAm ? "row-reverse" : "row"};
//     ${(props) =>
//       props.previousId == props.commentUserId && props.previousType !== "ENTER"
//         ? "margin : 0px 10px 0px 50px"
//         : "margin : 10px"};

//     .chat-bubble {
//       background-color: ${(props) =>
//         props.commentUserId == props.whoIAm ? "yellow" : "white"};
//       padding: 10px;
//       border-radius: 10px;
//     }
//   }

//   .comment-date {
//     align-self: flex-end;
//     width: 140px;
//     font-size: 11px;
//     margin-left: 5px;
//     text-align: ${(props) =>
//       props.commentUserId == props.whoIAm ? "right" : "left"};
//     color: grey;
//   }
// `;

// const ProfileImage = styled.div`
//   div {
//     display: inline-block;
//   }

//   .img-wrapper {
//     display: ${(props) =>
//       props.commentUserId == props.whoIAm ||
//       (props.previousId == props.commentUserId &&
//         props.previousType !== "ENTER")
//         ? "none"
//         : "block"};
//     border-radius: 10px;
//     height: 40px;
//     width: 40px;
//     overflow: hidden;

//     img {
//       height: 40px;
//       width: 40px;
//     }
//   }
// `;

// const EntranceText = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 10px 0 10px 0;

//   div {
//     width: 30%;
//     background-color: #86b34f;
//     border-radius: 10px;
//     text-align: center;
//     color: #eaeaea;
//     font-weight: bold;
//   }
// `;

// const EscapeText = styled.div`
//   display: flex;
//   justify-content: center;
//   margin: 10px 0 10px 0;

//   div {
//     width: 30%;
//     background-color: #d74b53;
//     border-radius: 10px;
//     text-align: center;
//     color: #eaeaea;
//     font-weight: bold;
//   }
// `;

// const ChatRoomWrapper = styled.div`
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   align-items: auto;
//   justify-content: auto;
// `;

// const ChatLog = styled.div`
//   display: flex;
//   flex-direction: column;
//   overflow: scroll;
//   height: 70%;
//   background-color: rgb(186, 206, 224);
// `;

// const ChatInputArea = styled.div`
//   display: flex;
//   height: 20%;

//   textarea {
//     height: 60%;
//     width: 100%;
//     border: none;
//     padding: 10px;
//     font-size: 20px;
//     background-color: rgb(245, 245, 240);
//   }

//   div {
//     display: flex;
//     justify-content: right;
//   }

//   .button-pair {
//     display: flex;
//     flex-direction: column;
//     height: 70%;
//     background-color: rgb(245, 245, 240);

//     input {
//       display: none;
//     }

//     button {
//       border: none;
//       border-radius: 10px;
//       height: 50%;
//       width: 80px;
//       color: white;
//       font-weight: bolder;
//       cursor: pointer;
//     }

//     .picture-choice-label {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       border: none;
//       border-radius: 10px;
//       height: 50%;
//       width: 80px;
//       color: white;
//       font-weight: bolder;
//       cursor: pointer;
//       background-color: rgb(47, 79, 79);
//     }

//     .picture-submit {
//       background-color: #6f4f28;
//     }
//     .message-submit {
//       background-color: rgb(112, 128, 144);
//     }
//   }
// `;

// const UploadedImage = styled.img`
//   align-self: flex-end;
//   max-height: 300px;
//   max-width: 200px;
//   border-radius: 15px;
// `;

// export default ChatRoom;
