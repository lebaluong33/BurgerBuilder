import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render () {
    return(
      <Auxiliary>
      <Toolbar drawerToogleClicked={this.sideDrawerOpenHandler}/>
      <SideDrawer
        open={this.state.showSideDrawer}
        closed={this.sideDrawerCloseHandler} />
      <main className="content">
        {this.props.children}
      </main>
      </Auxiliary>
    );
  };
}
export default Layout;