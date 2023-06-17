import styled from 'styled-components';

const StAside = styled.aside`
    width: 72px;
    height: 100vh;
    overflow-y: auto;
    background-color: #1e1f22;
    display: flex;
    flex-direction: column;
    align-items: center;
    & a{
        margin: 10px 0;
    }
    // 채팅방 리스트
    & ul li{
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
        background-color: #313338;
        margin-bottom: 15px;
        overflow: hidden;
        font-size: 13px;
        cursor: pointer;
        transition: 0.3s;
        &:hover{
            border-radius:15px;
        }
    }
    // 채팅방 생성 버튼
    & button{
        width: 48px;
        height: 48px;
        border-radius: 30px;
        background-color: #313338;
        color: #23a559;
        font-size: 20px;
        font-weight: 700;
        line-height: 1;
        margin-bottom: 15px;
        transition: 0.3s;
        &:hover{
            background-color: #23a559;
            color: #fff;
        }
    }
`

export default StAside;