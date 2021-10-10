import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_DELIVERY_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from "../constants/cartConstants";
import Axios from 'axios';
import {useSelector} from "react-redux";

export const addToCart = (id, qty) => async(dispatch, getState) => {

    const { data } = await Axios.get(`http://localhost:5000/api/items/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.item_id,
            name: data.item_name,
            image: data.image,
            price: data.item_price,
            restaurant_id: id,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveDeliveryAddress = (data) => (dispatch) => {

    dispatch({
        type: CART_SAVE_DELIVERY_ADDRESS,
        payload: data
    })

    localStorage.setItem('deliveryAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {

    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}