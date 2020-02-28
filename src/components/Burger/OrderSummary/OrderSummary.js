import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSumarry = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map( igKey => {
      return (
        <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey} :</span> {props.ingredients[igKey]} 
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
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button clicked={props.purchaseCanceled} btnType="Danger">CANCEL</Button>
      <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>
    </Auxiliary>
  );
};

export default orderSumarry;