import {
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
    ITEM_LIST_FAIL,
    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
    ITEM_DETAILS_FAIL,
    ADD_NEW_ITEM_REQUEST,
    ADD_NEW_ITEM_SUCCESS,
    ADD_NEW_ITEM_FAIL,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_FAIL,
    UPDATE_ITEM_SUCCESS, DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAIL
} from "../constants/itemConstants";
import Axios from 'axios';
import {logout} from "./userActions";

export const listItems = (id) => async(dispatch) => {

    try{
        dispatch({type: ITEM_LIST_REQUEST})
        const {data} = await Axios.get(`/api/restaurants/${id}`)
        dispatch({type: ITEM_LIST_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({type: ITEM_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const listItemDetails = (id) => async(dispatch) => {

    try{
        dispatch({type: ITEM_DETAILS_REQUEST})

        const {data} = await Axios.get(`/api/items/${id}`)

        dispatch({type: ITEM_DETAILS_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: ITEM_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}


export const addNewMenuItem = (item_name,description, image, item_price, min_cal, max_cal, restaurantRestaurantId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_NEW_ITEM_REQUEST,
        })

        const {
            restaurantLogin: {restaurantInfo},
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${restaurantInfo.token}`
            },
        }

        const { data } = await Axios.post(
            '/api/items/additem',
            { item_name, restaurantRestaurantId, description, image, item_price, min_cal, max_cal },
            config
        )

        dispatch({
            type: ADD_NEW_ITEM_SUCCESS,
            payload: data,
        })

        localStorage.setItem('itemInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: ADD_NEW_ITEM_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateItem = (item_id, item_name, image, description, item_price, min_cal, max_cal, restaurantRestaurantId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_ITEM_REQUEST,
        })

        const {
            restaurantLogin: { restaurantInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${restaurantInfo.token}`,
            },
        }

        const { data } = await Axios.put(`/api/items/update`,{ item_id, item_name,restaurantRestaurantId, description, image, item_price, min_cal, max_cal }, config)

        dispatch({
            type: UPDATE_ITEM_SUCCESS,
            payload: data,
        })

        localStorage.setItem('itemInfo', JSON.stringify(data))

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: UPDATE_ITEM_FAIL,
            payload: message,
        })
    }
}

export const deleteItem = (item_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_ITEM_REQUEST,
        })

        const {
            restaurantLogin: { restaurantInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${restaurantInfo.token}`,
            },
        }

        const { data } = await Axios.put(`/api/items/delete`,{ item_id }, config)

        dispatch({
            type: DELETE_ITEM_SUCCESS,
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
            type: DELETE_ITEM_FAIL,
            payload: message,
        })
    }
}
