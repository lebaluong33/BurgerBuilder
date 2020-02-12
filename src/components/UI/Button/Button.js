import React from 'react';

import './Button.css';

const button = (props) => { 
  console.log(props.disabled);
  return (
    <button
      disabled={props.disabled}
      className={['Button', props.btnType].join(' ')}
      onClick={props.clicked}>{props.children}</button>
  )
};

export default button;