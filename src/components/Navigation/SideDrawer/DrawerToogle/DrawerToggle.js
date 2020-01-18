import React from 'react';

import './DrawerToggle.css';

const drawerToogle = (props) => (
  <div className='DrawerToggle' onClick={props.clicked} >
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToogle;