import {
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    USER_ORDER_LIST_REQUEST,
    USER_ORDER_LIST_FAIL,
    USER_ORDER_LIST_SUCCESS, RESTAURANT_ORDERS_LIST_REQUEST, RESTAURANT_ORDERS_LIST_SUCCESS, RESTAURANT_ORDERS_LIST_FAIL
} from "../constants/orderConstants";
import Axios from "axios";
import {logout} from "./userActions";

export const createOrder = (
        items_price,
    tax_price,
    delivery_fee,
    total_price,
    order_type,
    payment_method,
    delivery_address,
    userUserId,
    restaurantRestaurantId
) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await Axios.post(`/api/users/newOrder`,
            { items_price,
                tax_price,
                delivery_fee,
                total_price,
                order_type,
                payment_method,
                delivery_address,
                userUserId,
                restaurantRestaurantId }, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}

export const getOrderDetails = (order_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await Axios.post(`/api/users/getorderbyid`,
            { order_id }, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        })
    }
}


export const getUserOrdersList = (user_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_ORDER_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await Axios.post(`/api/users/getuserorders`,
            { user_id }, config)

        dispatch({
            type: USER_ORDER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: USER_ORDER_LIST_FAIL,
            payload: message,
        })
    }
}


export const getRestaurantOrdersList = (restaurant_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESTAURANT_ORDERS_LIST_REQUEST,
        })

        const {
            restaurantLogin: { restaurantInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${restaurantInfo.token}`,
            },
        }

        const { data } = await Axios.post(`/api/restaurants/getrestaurantorders`,
            { restaurant_id }, config)

        dispatch({
            type: RESTAURANT_ORDERS_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: RESTAURANT_ORDERS_LIST_FAIL,
            payload: message,
        })
    }
}