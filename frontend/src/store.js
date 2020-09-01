import {createStore,combineReducers, compose, applyMiddleware} from 'redux';
import {productListReducer, productDetailReducer} from './reducer/productReducers';
import thunk from 'redux-thunk';
import {cartReducer} from './reducer/cartReducers'

const initialState={};

const reducer=combineReducers({
    productList:productListReducer,
    productDetail:productDetailReducer,
    cart:cartReducer
});

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;