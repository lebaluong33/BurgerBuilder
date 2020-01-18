import React from 'react';

import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from '../SideDrawer/DrawerToogle/DrawerToggle';

const toolbar = (props) => (
  <header className='Toolbar'>
    <DrawerToggle clicked={props.drawerToogleClicked} />
    <div className="ToolbarLogo">
      <Logo />
    </div>
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;