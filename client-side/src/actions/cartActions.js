import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";
import Axios from 'axios';

export const addToCart = (id, qty) => async(dispatch, getState) => {

    const { data } = await Axios.get(`http://localhost:5000/api/items/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.item_id,
            name: data.item_name,
            image: data.image,
            price: data.item_price,
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