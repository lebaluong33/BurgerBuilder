import React from 'react';

import Auxiliary from '../Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorhandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [ error, clearError ] = useHttpErrorhandler(axios);
    return (
      <Auxiliary>
        <Modal 
          show={error}
          modalClosed={clearError} >
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...props}/>
      </Auxiliary>
    );
  };
};

export default withErrorHandler;