import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Icon } from '../../img/discord-icon-white.svg';

// TODO: online 상태 props 받아서 처리 추가
const ProfileImg = ({ imgUrl, defaultImgColor }) => {
  const [imgLoadError, setImgLoadError] = useState(false);

  const imgErrorHandler = () => {
    setImgLoadError(true);
  };

  // <img src={defaultImgBlue} alt='default profile' />
  return (
    <StImg className='profileImg' defaultImgColor={defaultImgColor}>
      <div>
        {imgLoadError || imgUrl === null || imgUrl === undefined ? (
          <div className='iconWrapperCircle'>
            <Icon />
          </div>
        ) : (
          <img src={imgUrl} alt='profile' onError={imgErrorHandler} />
        )}
      </div>
      <span className='onlineAlert'>&nbsp;</span>
    </StImg>
  );
};

export default ProfileImg;

// const defaultImgColorList = ['#5865F2', '#57F287', '#FEE75C', '#EB459E', '#ED4245', '#000000'];

// const defaultImgColor = defaultImgColorList[Math.floor(Math.random() * defaultImgColorList.length)];

const StImg = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  & > div {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 30px;
    & img {
      width: 100%;
    }
    & .iconWrapperCircle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: ${(props) => props.defaultImgColor};
      display: flex;
      align-items: center;
      justify-content: center;

      & svg {
        width: 60%;
      }
    }
  }
  & > .onlineAlert {
    position: absolute;
    bottom: 0;
    right: -2px;
    display: block;
    width: 10px;
    height: 10px;
    border: 3px solid #232428;
    border-radius: 10px;
    background: #23a559;
  }
  & > .onlineAlert.offline {
    background: #949ba4;
  }
`;
