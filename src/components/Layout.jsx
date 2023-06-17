import React from 'react'
import Aside from './Aside';

const Layout = (props) => {
  return (
    <div id='wrapper'>
      <Aside />
      <main id="main">
        {props.children}
      </main>
    </div>
  )
}

export default Layout;