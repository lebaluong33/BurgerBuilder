import React from 'react';

import './NavigationItem.css';

const navigationItems = (props) => (
  <li className="NavigationItem">
    <a 
    className={props.active ? 'active' : null}
    href={props.link} >{props.children}</a>
  </li>
);

export default navigationItems;