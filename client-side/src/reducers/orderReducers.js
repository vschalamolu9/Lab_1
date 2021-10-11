import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    USER_ORDER_LIST_REQUEST,
    USER_ORDER_LIST_SUCCESS,
    USER_ORDER_LIST_FAIL,
    RESTAURANT_ORDERS_LIST_REQUEST,
    RESTAURANT_ORDERS_LIST_SUCCESS, RESTAURANT_ORDERS_LIST_FAIL
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {

    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return{
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderDetailsReducer = (state =
                                        {loading: true, orderItems:[], shippingAddress: {}}, action) => {

    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return{
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const userOrderListReducer = (state =
                                        {orders:[]}, action) => {

    switch(action.type){
        case USER_ORDER_LIST_REQUEST:
            return{
                loading: true
            }
        case USER_ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case USER_ORDER_LIST_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const restaurantOrdersListReducer = (state =
                                         {orders:[]}, action) => {

    switch(action.type){
        case RESTAURANT_ORDERS_LIST_REQUEST:
            return{
                loading: true
            }
        case RESTAURANT_ORDERS_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case RESTAURANT_ORDERS_LIST_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}