import React, { useState } from 'react'

const Chat = () => {

  const [searchInputValue, setSearchInputValue] = useState('');

  const inputChangeHandler = (event) => {
    setSearchInputValue(event.target.value);
  }

  return (
    <Chat>
        <nav>
            <button># 채팅방 제목</button>
            <input type="text" value={searchInputValue} placeholder='검색하기' onChange={() =>inputChangeHandler()} />
        </nav>
        <section>
            <div className='myChat'>

            </div>
            <div className='otherChat'>

            </div>
        </section>
    </Chat>
  )     
}

export default Chat