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
    <nav className="DesktopOnly">
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;