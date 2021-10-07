import {createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import {restaurantListReducer} from './reducers/restaurantReducers';
import {itemDetailsReducer, itemListReducer} from "./reducers/itemReducers";

const reducer = combineReducers({
    restaurantList: restaurantListReducer,
    itemList: itemListReducer,
    itemDetails: itemDetailsReducer
})

const initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store