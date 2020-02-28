import React, {memo} from 'react';

import './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== props.show || nextProps.children !== props.children;
  // }
  
  return(
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div 
      className='Modal'
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}>
      {props.children}
    </div>
    </Auxiliary>
  );
};

export default memo(modal, (prevProps, nextProps) => (
  nextProps.show === prevProps.show && nextProps.children === prevProps.children
));