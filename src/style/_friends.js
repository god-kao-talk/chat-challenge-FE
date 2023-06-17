import styled from 'styled-components';

const StFriends = styled.article`
    width: calc(100% - 312px);
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #313338;
    & nav{
        display: flex;
        align-items: center;
        padding : 0 15px;
        width: 100%; 
        height: 65px;
        box-sizing: border-box;
        border-bottom: 2px solid #232428;
        & > .addFriends{
            background-color: #23a559;
            padding: 7px 15px;
            border-radius: 3px;
            font-weight: 700;
        }
    }
    & section {
        padding: 15px;
        box-sizing: border-box;

        & h2{
            font-size: 16px;
            margin-bottom: 20px;
        }
    }
`
export default StFriends;