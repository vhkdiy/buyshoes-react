'use strict'
const { cartItems, products } = require("./data");
const Immutable =  require('seamless-immutable');
const { createStore, combineReducers } = require('redux');

/*
函数功能：
所需参数：
返回值：
*/
const cartItemsReducer = (state = Immutable(cartItems), action) => {
  switch (action.type) {
    case 'INCREMENT_QUANTITY':
      return state.updateIn([action.id, "quantity"], x => x + 1);
    case 'DECREMENT_QUANTITY':
      return state.updateIn([action.id, "quantity"], x => x - 1);
    case 'ADD_PRODUCT_TO_CART':
      return state.updateIn([action.id], () => ({id: action.id, quantity: 1}));
    case 'REMOVE_CART_ITEM':
      return state.without(action.id);
    default:
      return state;
  } 
}

const productsReducer = (state = Immutable(products), action) => state;

const likeReducer = (state = Immutable([]), action) => {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_LIKE':
      if (state.indexOf(action.id) >= 0) {
        return state.filter(id => id !== action.id);
      }
      return [...state, action.id];
    default:
      return state;
  }
}


const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}


const store = createStore(combineReducers({cartItems: cartItemsReducer, products: productsReducer, likeProducts: likeReducer, visibilityFilter}), window.devToolsExtension && window.devToolsExtension());

module.exports = store; 