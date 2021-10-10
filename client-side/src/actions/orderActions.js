import {ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL} from "../constants/orderConstants";
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
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await Axios.post(`http://localhost:5000/api/users/newOrder`,
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