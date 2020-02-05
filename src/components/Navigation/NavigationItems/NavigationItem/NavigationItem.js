import React from 'react';

import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItems = (props) => (
  <li className="NavigationItem">
    <NavLink 
    to={props.link}
    exact={props.exact} >{props.children}</NavLink>
  </li>
);

export default navigationItems;