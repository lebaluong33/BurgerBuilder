import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import { 
  logoutSaga, 
  checkAuthTimeoutSaga, 
  authCheckStateSaga,
  authUserSaga
} from './auth';

import { initIngredientsSaga } from './burgerBuilder';

import { purchaseBurgerSaga, fetchOrders } from './order';

export function* watchAuth() {
  yield all([
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    yield takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga),
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
};

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
};

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrders);
}