import { ORDER_ITEMS_CREATE_REQUEST, ORDER_ITEMS_CREATE_SUCCESS, ORDER_ITEMS_CREATE_FAIL} from "../constants/orderItemsConstants";
import Axios from "axios";
import {logout} from "./userActions";


export const createOrderItems = (
    quantity, itemItemId, orderOrderId
) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ITEMS_CREATE_REQUEST,
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

        const { data } = await Axios.post(`/api/users/addorderitems`,
            { quantity, itemItemId, orderOrderId }, config)

        dispatch({
            type: ORDER_ITEMS_CREATE_SUCCESS,
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
            type: ORDER_ITEMS_CREATE_FAIL,
            payload: message,
        })
    }
}