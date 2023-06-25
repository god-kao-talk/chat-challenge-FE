import { styled } from 'styled-components';
import { TfiSearch } from 'react-icons/tfi';
import { useParams } from 'react-router-dom';
import { getSearchMessage } from '../api/search';
import useInput from '../hooks/useInput';
import { useState } from 'react';
import SearchListItem from './element/SearchListItem';

const Search = () => {
  const [searchList, setSearchList] = useState([]);
  const params = useParams();
  const roomCode = params.roomcode;

  const {
    inputData: searchKeyword,
    setInputData: setSearchKeyword,
    inputChangeHandler: searchKeywordChangeHandler,
  } = useInput();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const searchData = await getSearchMessage(roomCode, searchKeyword);
    setSearchList(searchData);

    setSearchKeyword('');
  };

  return (
    <StSearch>
      <nav>
        <StForm onSubmit={formSubmitHandler}>
          <StInput
            placeholder='검색하기'
            value={searchKeyword}
            onChange={searchKeywordChangeHandler}
          />
          <TfiSearch />
        </StForm>
      </nav>
      <StSearchListWrapper>
        {searchList?.map((searchResult, index) => (
          <SearchListItem key={index} searchData={searchResult} />
        ))}
      </StSearchListWrapper>
    </StSearch>
  );
};

const StSearch = styled.article`
  position: fixed;
  right: 0;
  width: 300px;
  height: 100vh;
  overflow-y: auto;
  color: #949ba4;
  background-color: #2b2d31;

  & nav {
    display: flex;
    align-items: center;
    padding: 0 15px;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 2px solid #232428;
    background-color: #313338;
  }
`;

const StForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #191a1c;
  padding: 7px;
  border-radius: 5px;
`;

const StInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: inherit;
  color: white;
`;

const StSearchListWrapper = styled.ul`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding-top: 10px;
  overflow-y: auto;
`;

export default Search;
