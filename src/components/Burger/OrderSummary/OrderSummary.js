import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSumarry extends Component {

  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
  }

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map( igKey => {
        return (
          <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey} :</span> {this.props.ingredients[igKey]} 
          </li>
        );
      });
    return(
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.purchaseCanceled} btnType="Danger">CANCEL</Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
      </Auxiliary>
    );
  }
};

export default OrderSumarry;