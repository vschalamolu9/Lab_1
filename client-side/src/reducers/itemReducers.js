import {
    ITEM_LIST_SUCCESS,
    ITEM_LIST_REQUEST,
    ITEM_LIST_FAIL,
    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
    ITEM_DETAILS_FAIL,
    ADD_NEW_ITEM_REQUEST,
    ADD_NEW_ITEM_SUCCESS,
    ADD_NEW_ITEM_FAIL,
    UPDATE_ITEM_REQUEST,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAIL,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAIL
} from "../constants/itemConstants";

export const itemListReducer = (state = {items: []}, action) => {

    switch(action.type){
        case ITEM_LIST_REQUEST:
            return {loading: true, items: []}
        case ITEM_LIST_SUCCESS:
            return {loading: false, items: action.payload}
        case ITEM_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const itemDetailsReducer = (state = {item : {}},action) => {

    switch(action.type){
        case ITEM_DETAILS_REQUEST:
            return {loading:true, ...state}
        case ITEM_DETAILS_SUCCESS:
            return {loading: false, item: action.payload}
        case ITEM_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const addNewItemReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_ITEM_REQUEST:
            return { loading: true }
        case ADD_NEW_ITEM_SUCCESS:
            return { loading: false, success:true,  itemInfo: action.payload }
        case ADD_NEW_ITEM_FAIL:
            return { loading: false, success: false, error: action.payload }
        default:
            return state
    }
}

export const updateMenuItemReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ITEM_REQUEST:
            return { loading: true }
        case UPDATE_ITEM_SUCCESS:
            return { loading: false, itemInfo: action.payload }
        case UPDATE_ITEM_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteMenuItemReducer = (state = {}, action) => {
    switch (action.type){
        case DELETE_ITEM_REQUEST:
            return {loading: true}
        case DELETE_ITEM_SUCCESS:
            return { loading: false, itemInfo: action.payload}
        case DELETE_ITEM_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}