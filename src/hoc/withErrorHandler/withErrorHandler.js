import React, {Component} from 'react';

import Auxiliary from '../Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor (props) {
      super(props);
      this.state = {
        error: null
      };
    }

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use( req => {
        this.setState({error: null});
        return req;
      }
      )
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }

    componentWillUnmount () {
      console.log('[withErrorHandler] componentWillUnmount', this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render () {
      return (
        <Auxiliary>
          <Modal 
           show={this.state.error}
           modalClosed={this.errorConfirmedHandler} >
             {this.state.error ? this.state.error.message : null}
           </Modal>
           <WrappedComponent {...this.props}/>
        </Auxiliary>
      );
    };
  ;}
};

export default withErrorHandler;