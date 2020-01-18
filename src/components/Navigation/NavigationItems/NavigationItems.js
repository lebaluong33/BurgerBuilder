import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className='NavigationItems'>
    <NavigationItem link='/' active={true}>BurgerBuilder</NavigationItem>
    <NavigationItem>Checkout</NavigationItem>
  </ul>
);

export default navigationItems;