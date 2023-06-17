import React from "react";
import StFriends from "../style/_friends";
import List from "../style/_list";
import ProfileImg from "./element/ProfileImg";

const Friends = () => {
  return (
    <StFriends>
      <nav>
        <button className="addFriends">친구 추가하기</button>
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
    </StFriends>
  );
};

export default Friends;
