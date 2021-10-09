import {
    RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_REGISTER_REQUEST,
    RESTAURANT_REGISTER_SUCCESS,
    RESTAURANT_REGISTER_FAIL,
    RESTAURANT_LOGOUT,
    RESTAURANT_LOGIN_REQUEST, RESTAURANT_LOGIN_SUCCESS, RESTAURANT_LOGIN_FAIL
} from "../constants/restaurantConstants";

export const restaurantListReducer = (state = {restaurants: []}, action) => {

    switch(action.type){
        case RESTAURANT_LIST_REQUEST:
            return {loading: true, restaurants: []}
        case RESTAURANT_LIST_SUCCESS:
            return {loading: false, restaurants: action.payload}
        case RESTAURANT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const restaurantRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case RESTAURANT_REGISTER_REQUEST:
            return { loading: true }
        case RESTAURANT_REGISTER_SUCCESS:
            return { loading: false, restaurantData: action.payload }
        case RESTAURANT_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case RESTAURANT_LOGOUT:
            return {}
        default:
            return state
    }
}

export const restaurantLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case RESTAURANT_LOGIN_REQUEST:
            return { loading: true }
        case RESTAURANT_LOGIN_SUCCESS:
            return { loading: false, restaurantData: action.payload }
        case RESTAURANT_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case RESTAURANT_LOGOUT:
            return {}
        default:
            return state
    }
}