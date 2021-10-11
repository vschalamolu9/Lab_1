import {createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import {
    restaurantDetailsReducer,
    restaurantListReducer,
    restaurantLoginReducer,
    restaurantRegisterReducer,
    restaurantUpdateReducer
} from './reducers/restaurantReducers';
import {itemDetailsReducer, itemListReducer} from "./reducers/itemReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer
} from "./reducers/userReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    restaurantOrdersListReducer,
    userOrderListReducer
} from "./reducers/orderReducers";
import {orderItemsCreateReducer} from "./reducers/orderItemsReducers";

const reducer = combineReducers({
    restaurantList: restaurantListReducer,
    itemList: itemListReducer,
    itemDetails: itemDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    restaurantLogin: restaurantLoginReducer,
    restaurantRegister: restaurantRegisterReducer,
    restaurantUpdateProfile: restaurantUpdateReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderItemsCreate: orderItemsCreateReducer,
    orderDetails: orderDetailsReducer,
    userOrdersList : userOrderListReducer,
    restaurantDetails: restaurantDetailsReducer,
    restaurantOrdersList: restaurantOrdersListReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const restaurantInfoFromStorage = localStorage.getItem('restaurantInfo') ? JSON.parse(localStorage.getItem('restaurantInfo')) : null

const deliveryAddressFromStorage = localStorage.getItem('deliveryAddress') ? JSON.parse(localStorage.getItem('deliveryAddress')) : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage, deliveryAddress: deliveryAddressFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    },
    restaurantLogin: {
        restaurantInfo: restaurantInfoFromStorage
    }
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store