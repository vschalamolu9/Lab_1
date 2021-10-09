import {
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_LOGIN_REQUEST,
    RESTAURANT_LOGIN_SUCCESS,
    RESTAURANT_LOGIN_FAIL,
    RESTAURANT_LOGOUT,
    RESTAURANT_REGISTER_REQUEST, RESTAURANT_REGISTER_SUCCESS, RESTAURANT_REGISTER_FAIL,
} from "../constants/restaurantConstants";
import Axios from 'axios';

export const listRestaurants = () => async(dispatch) => {
    try{
        dispatch({type: RESTAURANT_LIST_REQUEST})

        const {data} = await Axios.get('http://localhost:5000/api/restaurants')

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

        const {data} = await Axios.post('http://localhost:5000/api/restaurants/login', { restaurant_email, password}, config)

        dispatch({
            type: RESTAURANT_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('restaurantData', JSON.stringify(data))

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

export const logout = () => (dispatch) => {
    localStorage.removeItem('restaurantData')
    dispatch({ type: RESTAURANT_LOGOUT })
    document.location.href = '/restaurants/home'
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
            'http://localhost:5000/api/restaurants/register',
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