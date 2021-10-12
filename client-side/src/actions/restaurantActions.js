import {
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_LOGIN_REQUEST,
    RESTAURANT_LOGIN_SUCCESS,
    RESTAURANT_LOGIN_FAIL,
    RESTAURANT_LOGOUT,
    RESTAURANT_REGISTER_REQUEST,
    RESTAURANT_REGISTER_SUCCESS,
    RESTAURANT_REGISTER_FAIL,
    RESTAURANT_UPDATE_PROFILE_REQUEST,
    RESTAURANT_UPDATE_PROFILE_SUCCESS,
    RESTAURANT_UPDATE_PROFILE_FAIL,
    RESTAURANT_DETAILS_REQUEST,
    RESTAURANT_DETAILS_FAIL,
    RESTAURANT_DETAILS_SUCCESS,
    RESTAURANT_ITEMS_LIST_REQUEST,
    RESTAURANT_ITEMS_LIST_SUCCESS, RESTAURANT_ITEMS_LIST_FAIL,
} from "../constants/restaurantConstants";
import Axios from 'axios';

export const listRestaurants = () => async(dispatch) => {
    try{
        dispatch({type: RESTAURANT_LIST_REQUEST})

        const {data} = await Axios.get('/api/restaurants')

        dispatch({type: RESTAURANT_LIST_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: RESTAURANT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const restaurantSignin = (restaurant_email, password) => async (dispatch) => {
    try{
        dispatch({
            type: RESTAURANT_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            }
        }

        const {data} = await Axios.post('/api/restaurants/login', { restaurant_email, password}, config)

        dispatch({
            type: RESTAURANT_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('restaurantInfo', JSON.stringify(data))

    }
    catch (error) {
        dispatch({
            type: RESTAURANT_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getRestaurantDetails = (restaurant_id) => async (dispatch) => {
    try{
        dispatch({
            type: RESTAURANT_DETAILS_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            }
        }

        const {data} = await Axios.post('/api/restaurants/login', { restaurant_id }, config)

        dispatch({
            type: RESTAURANT_DETAILS_SUCCESS,
            payload: data,
        })

        localStorage.setItem('restaurantInfo', JSON.stringify(data))

    }
    catch (error) {
        dispatch({
            type: RESTAURANT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const restaurantLogout = () => (dispatch) => {
    localStorage.removeItem('restaurantInfo')
    dispatch({ type: RESTAURANT_LOGOUT })
    document.location.href = '/'
}

export const registerRestaurant = (restaurant_name, image, description, restaurant_email,password, restaurant_contact, restaurant_street, restaurant_city, restaurant_state,
                                   restaurant_country, restaurant_zip_code, delivery_fee, min_delivery_time, max_delivery_time) => async (dispatch) => {
    try {
        dispatch({
            type: RESTAURANT_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await Axios.post(
            '/api/restaurants/register',
            { restaurant_name, image, description, restaurant_email,password, restaurant_contact, restaurant_street, restaurant_city, restaurant_state,
                restaurant_country, restaurant_zip_code, delivery_fee, min_delivery_time, max_delivery_time},
            config
        )

        dispatch({
            type: RESTAURANT_REGISTER_SUCCESS,
            payload: data,
        })

        dispatch({
            type: RESTAURANT_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('restaurantData', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: RESTAURANT_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const updateRestaurantProfile = (restaurant_id, restaurant_name, image, description, restaurant_email,password, restaurant_contact, restaurant_street, restaurant_city, restaurant_state,
                                   restaurant_country, restaurant_zip_code, delivery_fee, min_delivery_time, max_delivery_time) => async (dispatch, getState) => {
    try {
        dispatch({
            type: RESTAURANT_UPDATE_PROFILE_REQUEST,
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

        const { data } = await Axios.put(
            'http://localhost:5000/api/restaurants/profile',
            { restaurant_id,restaurant_name, image, description, restaurant_email,password, restaurant_contact, restaurant_street, restaurant_city, restaurant_state,
                restaurant_country, restaurant_zip_code, delivery_fee, min_delivery_time, max_delivery_time},
            config
        )

        dispatch({
            type: RESTAURANT_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })


        localStorage.setItem('restaurantInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: RESTAURANT_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const restaurantMenuItemsList = (restaurant_id) => async(dispatch, getState) => {

    try{
        dispatch({type: RESTAURANT_ITEMS_LIST_REQUEST})

        const {
            restaurantLogin: {restaurantInfo},
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${restaurantInfo.token}`
            },
        }

        const {data} = await Axios.post('http://localhost:5000/api/restaurants/getitems',{restaurant_id}, config)
        dispatch({type: RESTAURANT_ITEMS_LIST_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({type: RESTAURANT_ITEMS_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}