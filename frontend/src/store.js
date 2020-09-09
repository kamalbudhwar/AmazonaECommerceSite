import {createStore,combineReducers, compose, applyMiddleware} from 'redux';
import {productListReducer, productDetailReducer, productSaveReducer,productDeleteReducer} from './reducer/productReducers';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';
import { userSigninReducers, userRegisterReducers } from './reducer/userReducers';
import {cartReducer} from './reducer/cartReducers.js'
const cartItems=Cookies.getJSON('cartItems')||[];
const userInfo=Cookies.getJSON('userInfo')||{};
const initialState={userSignin:userInfo,cart:{cartItems,shipping:{},payment:{}}};

const reducer=combineReducers({
    productList:productListReducer,
    productSave:productSaveReducer,
    productDetail:productDetailReducer,
    productDelete:productDeleteReducer,
    cart:cartReducer,
    userSignin:userSigninReducers,
    userRegister:userRegisterReducers
    
});

const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;