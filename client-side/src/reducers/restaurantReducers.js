import {
    RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_REGISTER_REQUEST,
    RESTAURANT_REGISTER_SUCCESS,
    RESTAURANT_REGISTER_FAIL,
    RESTAURANT_LOGOUT,
    RESTAURANT_LOGIN_REQUEST,
    RESTAURANT_LOGIN_SUCCESS,
    RESTAURANT_LOGIN_FAIL,
    RESTAURANT_UPDATE_PROFILE_REQUEST,
    RESTAURANT_UPDATE_PROFILE_FAIL,
    RESTAURANT_UPDATE_PROFILE_SUCCESS,
    RESTAURANT_DETAILS_REQUEST,
    RESTAURANT_DETAILS_SUCCESS,
    RESTAURANT_DETAILS_FAIL,
    RESTAURANT_DETAILS_RESET,
    RESTAURANT_ITEMS_LIST_REQUEST,
    RESTAURANT_ITEMS_LIST_SUCCESS, RESTAURANT_ITEMS_LIST_FAIL
} from "../constants/restaurantConstants";
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS
} from "../constants/userConstants";
import {ITEM_LIST_FAIL, ITEM_LIST_REQUEST, ITEM_LIST_SUCCESS} from "../constants/itemConstants";

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
            return { loading: false, restaurantInfo: action.payload }
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
            return { loading: false, restaurantInfo: action.payload }
        case RESTAURANT_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case RESTAURANT_LOGOUT:
            return {}
        default:
            return state
    }
}

export const restaurantUpdateReducer = (state = { restaurant: {}}, action) => {
    switch (action.type) {
        case RESTAURANT_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case RESTAURANT_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, restaurantInfo: action.payload }
        case RESTAURANT_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case RESTAURANT_LOGOUT:
            return {}
        default:
            return state
    }
}

export const restaurantDetailsReducer = (state = { restaurant: {}}, action) => {
    switch (action.type) {
        case RESTAURANT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case RESTAURANT_DETAILS_SUCCESS:
            return { loading: false, restaurant: action.payload }
        case RESTAURANT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case RESTAURANT_DETAILS_RESET:
            return { restaurant: {}}
        default:
            return state
    }
}

export const restaurantItemListReducer = (state = {restaurantMenuItems: []}, action) => {

    switch(action.type){
        case RESTAURANT_ITEMS_LIST_REQUEST:
            return {loading: true, restaurantMenuItems: []}
        case RESTAURANT_ITEMS_LIST_SUCCESS:
            return {loading: false, restaurantMenuItems: action.payload}
        case RESTAURANT_ITEMS_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}