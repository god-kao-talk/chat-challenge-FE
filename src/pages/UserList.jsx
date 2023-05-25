import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import axios from "../utils/axios";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Icon,
  TextField,
  AddCircleIcon,
  IconButton,
} from "@mui/material";
import chatroom from "../img/chatroom.png";
import { Cookie } from "@mui/icons-material";
import Cookies from 'js-cookie';

function UserList() {
  const [userList, setUserList] = useState([]);
  const [myProfile, setMyProfile] = useState();
  const [chatRooms, setChatRooms] = useState([]);
  const [addRoom, setAddRoom] = useState(false); //방생성 모달
  const [showModal, setShowModal] = useState(false); //프로필 모달
  const [roomName, setRoomName] = useState("");
  const [birthday, setBirthday] = useState([]);
  const [detailProfile, setDetailProfile] = useState([]);

  const Authorization = Cookies.get('Authorization')

  const navigate = useNavigate();
  // console.log(myProfile);

  const openModal = () => {
    setAddRoom(true);
  };

  const closeModal = () => {
    setAddRoom(false);
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleAddRoom = () => {
    addChatRoom();
    closeModal();
  };

  useEffect(() => {
    getMyProfile();
    getUsersList();
    getChatRoomList();
  }, []);

  //내 정보 조회
  const getMyProfile = async () => {
    console.log("내정보 조회")
    try {
      const response = await axios.get(
        "/users/myinfo",
        {
          headers: {
            Authorization: `Bearer ${Authorization}`,
          },
        }
      );
      setMyProfile(response.data);
      console.log("내 정보!! : ", response.data)
    } catch (error) {
      console.error("실패시 에러:", error);
    }
  };

  // 유저목록 조회
  const getUsersList = async () => {
    console.log("유저리스트 조회")
    try {
      const response = await axios.get(
        "/users",
        {
          headers: {
            Authorization: `Bearer ${Authorization}`,
          },
        }
      );
      setUserList(response.data);
      console.log("유저 리스트 정보!! : ", response.data)
    } catch (error) {
      console.error("실패시 에러:", error);
    }
  };

  // 체팅방리스트 조회
  const getChatRoomList = async () => {
    console.log("채팅방리스트 조회")
    try {
      const response = await axios.get(
        "/room",
        {
          headers: {
            Authorization: `Bearer ${Authorization}`,
          },
        }
      );
      setChatRooms(response.data);
      console.log("채팅방 리스트 정보!! : ", response.data)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 방생성
  const addChatRoom = async () => {
    try {
      const response = await axios.post(
        "/chat",
        {
          roomName: roomName,
        },
        {
          headers: {
            Authorization: `Bearer ${Authorization}`,
          },
        }
      );
      console.log(response.data);
      setRoomName(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //유저 정보 조회
  const userDetail = (userId) => {
    getUserDetailModal(userId);
    setShowModal(true);
  };

  const getUserDetailModal = async (userId) => {
    console.log("유저 정보 조회", Authorization)
    try {
      const response = await axios.get(
        `/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${Authorization}`,
          },
        }
      );
      console.log(response.data);
      setDetailProfile(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //채팅방 입장시도
  const entryChatRoom = (roomId) => {
    console.log("채팅방 입장하기", roomId)
    navigate(`/ChatRoom/${roomId}`);
  };

  return (
    <>
      <Header />
      <UserListContainer>
        <UserInfoContainer
          onClick={() => navigate(`/Mypage/${myProfile.userid}`)}
        >
          {myProfile && (
            <>
              <UserImage src={myProfile.imageUrl} alt='프로필 사진' />
              <Name>{myProfile.nickname}</Name>
            </>
          )}
        </UserInfoContainer>

        <ShowListContainer>
          <ShowContainerSecthon>
            {userList.map((user) => (
              <ShowUserList
                key={user.nickname}
                onClick={() => userDetail(user.id)}
              >
                <UserImage src={user.imageUrl} alt='프로필 사진' />
                <Name>{user.nickname}</Name>
              </ShowUserList>
            ))}
          </ShowContainerSecthon>

          <ShowContainerSecthon2>

            <ChatRoomButton src={chatroom} alt='' onClick={openModal} />

            {chatRooms.map((room) => (
              <ShowChatRooms
                key={room.roomId}
                onClick={() => entryChatRoom(room.roomId)}
              >
                <RoomProfile>
                  <RoomProfileImg
                    src={room.profile_image}
                    alt='Profile Image'
                  />
                  <RoomName>{room.roomName}</RoomName>
                </RoomProfile>
              </ShowChatRooms>
            ))}
          </ShowContainerSecthon2>

          {/* 방생성 모달 */}
          <ReactModal
            isOpen={addRoom}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={{
              content: {
                width: "300px",
                height: "250px",
                margin: "auto",
                borderRadius: "8px",
              },
              overlay: {},
            }}
          >
            <AddRoomModal>
              <TextField
                id='outlined-basic'
                label='방이름'
                variant='outlined'
                onChange={handleRoomNameChange}
                value={roomName}
                sx={{}}
              />
              <Button
                variant='outlined'
                onClick={handleAddRoom}
                sx={
                  {
                    // marginLeft: '160px',
                  }
                }
              >
                추가
              </Button>
            </AddRoomModal>
          </ReactModal>

          {/* 프로필모달 */}
          <ReactModal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            ariaHideApp={false}
            style={{
              content: {
                width: "500px",
                height: "50%",
                margin: "auto",
                borderRadius: "8px",
              },
              overlay: {},
            }}
          >
            <UserProfileModal>
              <UserProfileImage
                src={detailProfile.imageUrl}
                alt='프로필 사진'
              />
              <UserProfileName>{detailProfile.nickname}</UserProfileName>
            </UserProfileModal>
          </ReactModal>
        </ShowListContainer>
      </UserListContainer>
    </>
  );
}

export default UserList;

const Comment = styled.div`
  margin-left: auto;
  font-weight: bold; 
  
`

const UserProfileComment = styled.div`
  margin-top: auto; 
  font-weight: bold; 
  font-size: 30px;
`

const ChatRoomButton = styled.img`
  cursor: pointer;
  width: 100px;
  height: 100px;
  /* margin-left: 500px; */
  margin-left: auto;

`;

const RoomProfile = styled.div`
  display: flex;
`;

const RoomProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid white;
`;

const AddRoomModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 50px;

  & > button {
  }
`;

const UserProfileModal = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 20px;
`;

const UserProfileImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 40%;
`;

const UserProfileName = styled.div`
  margin-top: 50px;
`;

const ShowContainerSecthon = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  /* border: 1px solid black; */
  padding: 20px;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;
const ShowContainerSecthon2 = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  /* border: 1px solid black; */
  padding: 20px;
  width: 100%;
  border-radius: 10px;
`;

const ShowListContainer = styled.div`
  /* border: 1px solid black; */
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  gap: 5%;
`;
const ShowChatRooms = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 90px;
  margin-bottom: 50px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: lightgray;
  }
`;

const BirthdayContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
`;

const BirthdayImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 40%;
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 40%;
`;
const ShowUserList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  /* border: 1px solid black; */
  border-radius: 8px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

const UserListContainer = styled.div`
  padding: 20px;
  /* background-color: #fee500; */
`;
const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  &:hover {
    background-color: lightgray;
  }
`;
const ProfilePicture = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 40%;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Name = styled.div`
  margin-left: 10px;
`;
const RoomName = styled.div`
  padding: 10px;
`;
