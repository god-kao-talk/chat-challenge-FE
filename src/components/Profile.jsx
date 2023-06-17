import React from "react";
import List from '../style/_list';
import StProfile from "../style/_profile";
import ProfileImg from "./element/ProfileImg";

const Profile = () => {
  return (
    <StProfile>
      <div className="profile">
        <ProfileImg />
        <p>
          사용자 이름
          <span>사용자 소개</span>
        </p>
      </div>
      <section className="friendsList">
        <h2>친구 목록</h2>
        <List>
          <li>
            <ProfileImg />
            <p>사용자 이름</p>
          </li>
        </List>
      </section>
    </StProfile>
  );
};

export default Profile;
