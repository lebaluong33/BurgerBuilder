import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Le Ba Luong',
        address: {
          street: '136/06 Nguyen Luong Bang',
          zipCode: '50000',
          country: 'VietNam'
        },
        email: 'lebaluong33@gmail.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch( error => {
        this.setState({loading: false});
      });
  }
  render() {
    let form = ( <form>
        <input className="Input" type="text" name="name" placeholder="Your Name" />
        <input className="Input" type="text" name="email" placeholder="Your Mail" />
        <input className="Input" type="text" name="street" placeholder="Your Street" />
        <input className="Input" type="text" name="postal" placeholder="Your Postal" />
        <Button 
        btnType="Success"
        clicked={this.orderHandler} >ORDER</Button>
      </form>
      );
    if( this.state.loading ) {
      form = <Spinner />;
    }
    return(
      <div className="ContactData">
        <h4>Enter Your Contact Data</h4>
          {form}
      </div>
    );
  };
};

export default ContactData;