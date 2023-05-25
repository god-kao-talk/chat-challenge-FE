import axios from "axios";

// 채팅방 입장시 api
const receiveChatRoomInfo = async ({ token, roomId }) => {
  console.log("동작확인!!!!!!!!!!!!!!!!!!!!!!!")
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/chat/${roomId}`,
      {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      }
    );
    console.log("채팅방 조회 후 데이터에 대한 출력 : ", response)
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data.message);
  }
};

// 채팅방 사진 전송 api, method : post, end-point : chat/image
// const submitPicture = async ({ token, file }) => {
//   console.log(file);
//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_SERVER_URL}/chat/image`,
//       file,
//       { headers: { ACCESS_KEY: `${token}` } }
//     );
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error.response.data.message);
//   }
// };

// 마이페이지 get api
const receiveMyPageInfo = async ({ token }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/users/myinfo`,
      { 
        headers: { 
          Authorization: `Bearer ${token}` 
        } 
      }
    );
    console.log("내 정보 조회 후 데이터에 대한 출력 : ", response)
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data.message);
  }
};

//마이페이지 put api, method : put, end-point : /users/mypage
const editMyPageInfo = async ({ token, userInfo }) => {
  try {
    const { profile_image, ...userInfoWithoutImage } = userInfo;
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/users/mypage`,
      userInfoWithoutImage,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data.message);
  }
};

export {
  receiveChatRoomInfo,
  // submitPicture,
  receiveMyPageInfo,
  editMyPageInfo,
};
