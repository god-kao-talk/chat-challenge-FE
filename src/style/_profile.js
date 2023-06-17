import styled from 'styled-components';

// 친구 리스트 목록
const StProfile = styled.article`
    width: 240px;
    height: 100vh;
    overflow-y: auto;
    color:#949ba4;
    background-color: #2b2d31;

    // 프로필 영역
    & > .profile {
        display: flex;
        align-items: center;
        width: 100%;
        height: 65px;
        padding: 15px;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #232428;
        & p{
            font-weight: 700;
            font-size: 15px;
            color: #fff;
            & > span{
                font-weight: 500;
                font-size: 11px;
                display: block;
            }
        }
    }
    // 친구 목록
    & .friendsList {
        padding: 15px;
        box-sizing: border-box;
        & h2{
            font-size: 16px;
            margin-bottom: 10px;
        }
    }
`

export default StProfile;