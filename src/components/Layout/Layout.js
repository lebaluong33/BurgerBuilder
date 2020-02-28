import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerCloseHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerOpenHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return(
    <Auxiliary>
    <Toolbar
      isAuth={props.isAuthenticated}
      drawerToogleClicked={sideDrawerOpenHandler}/>
    <SideDrawer
      open={showSideDrawer}
      closed={sideDrawerCloseHandler} />
    <main className="content">
      {props.children}
    </main>
    </Auxiliary>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};


export default connect(mapStateToProps)(Layout);