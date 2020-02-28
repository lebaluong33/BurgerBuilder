import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      }).reduce((sum, el) =>{
        return sum + el;
      }, 0);
      return sum > 0;
  }

  const purchaseHandler = () => {
    if(props.isAuthenticated) {
      setPurchasing(true); 
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...props.ings
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  };
  let orderSummary = null;
  let burger =  props.error ? <p>Can't load ingredients!</p> : <Spinner />;
  if (props.ings) {
    orderSummary = (<OrderSummary 
    purchaseCanceled={purchaseCancelHandler}
    price={props.price}
    purchaseContinued={purchaseContinueHandler}
    ingredients={props.ings}/>);
    burger =
      <Auxiliary>
        <Burger ingredients={props.ings} />
        <BuildControls 
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price} 
          isAuth={props.isAuthenticated}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}/>
        </Auxiliary>;
  }
  return (
    <Auxiliary>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliary>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.order.purchased,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));