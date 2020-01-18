import React from 'react';

import burgerLogo from '../../assets/image/burger-logo.png';
import './Logo.css';

const logo = (props) => (
  <div className='Logo'>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;