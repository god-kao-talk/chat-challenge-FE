import React from "react";
import { Link } from "react-router-dom";
import StAside from "../style/_aside";
import { BsPlusLg } from "react-icons/bs";
import logo from '../img/discord.svg'; 

const Aside = () => {
  return (
    <StAside>
      <Link to="/Main">
        <img
          src={logo}
          alt="메인페이지"
          style={{ width: "48px", height: "48px" }}
        />
      </Link>
      <button type="button">
        <BsPlusLg />
      </button>
      <ul>
        <li>채팅방</li>
        <li>채팅방</li>
        <li>채팅방</li>
        <li>채팅방</li>
      </ul>
    </StAside>
  );
};

export default Aside;
