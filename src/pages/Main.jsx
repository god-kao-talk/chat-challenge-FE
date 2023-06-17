import React from 'react';
import StMain from '../style/_main';
import Aside from '../components/Aside';
import Profile from '../components/Profile';
import Friends from '../components/Friends';

const Main = () => {
  return (
    <StMain>
        <Aside />
        <Profile />
        <Friends />
    </StMain>
  )
}

export default Main