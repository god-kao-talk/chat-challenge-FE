import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StAside from "../style/_aside";
import { BsPlusLg } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import logo from "../img/discord.svg";
import Portal from "../utils/portal";
import TextInput from "./element/Input";

const Aside = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const makeChatRoom = () => {
    setIsModalOpen(!isModalOpen);
  }
  const postChatRoom = () => {
    
  }
  return (
    <>
      <StAside>
        <Link to="/Main">
          <img
            src={logo}
            alt="메인페이지"
            style={{ width: "48px", height: "48px" }}
          />
        </Link>
        <button type="button" onClick={() => makeChatRoom()}>
          <BsPlusLg />
        </button>
        <ul>
          <li onClick={() => navigate("/chat")}>채팅방</li>
          <li>채팅방</li>
          <li>채팅방</li>
          <li>채팅방</li>
        </ul>
      </StAside>
      <Portal>
        <div id="modalbg" className={isModalOpen === true ? 'open' : '' }>
          <div className="modal">
            <TfiClose className="modalClose" onClick={()=> setIsModalOpen(false)}/>
            <h2>채팅방 생성</h2>
            <TextInput />
            {/* <button type="button" onClick={() => }>만들기</button> */}
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Aside;
