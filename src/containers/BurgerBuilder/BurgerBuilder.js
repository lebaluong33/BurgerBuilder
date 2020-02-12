import React, {Component} from 'react';
import { connect } from 'react-redux';

import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
     console.log(this.props);
    // axios.get('https://react-my-burger-56c22.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data});
    //   })
    //   .catch( error => {
    //     this.setState({error: true});
    //   });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      }).reduce((sum, el) =>{
        return sum + el;
      }, 0);
      return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true}); 
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render(){
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    };
    let orderSummary = null;
    let burger =  this.state.error ? <p>Can't load ingredients!</p> : <Spinner />;
    if (this.props.ings) {
      orderSummary = (<OrderSummary 
      purchaseCanceled={this.purchaseCancelHandler}
      price={this.props.price}
      purchaseContinued={this.purchaseContinueHandler}
      ingredients={this.props.ings}/>);
      burger =
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price} 
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}/>
          </Auxiliary>;
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  };
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));