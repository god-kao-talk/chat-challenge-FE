import styled from 'styled-components';

const StFriends = styled.article`
  width: calc(100% - 240px);
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #313338;
  & nav {
    display: flex;
    align-items: center;
    padding: 0 15px;
    width: 100%;
    height: 65px;
    box-sizing: border-box;
    border-bottom: 2px solid #232428;
    & > .addFriends {
      background-color: #23a559;
      padding: 7px 15px;
      border-radius: 3px;
      font-weight: 700;
    }
  }
  & section {
    padding: 15px;
    box-sizing: border-box;

    & h2 {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  & ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    & li {
      display: flex;
      margin-bottom: 15px;
      & p {
        font-weight: 700;
        font-size: 15px;
        & > span {
          font-weight: 500;
          font-size: 11px;
          display: block;
        }
      }
    }
  }
`;
export default StFriends;
