import { ORDER_ITEMS_CREATE_REQUEST, ORDER_ITEMS_CREATE_SUCCESS, ORDER_ITEMS_CREATE_FAIL } from "../constants/orderItemsConstants";

export const orderItemsCreateReducer = (state = {}, action) => {

    switch(action.type){
        case ORDER_ITEMS_CREATE_REQUEST:
            return{
                loading: true
            }
        case ORDER_ITEMS_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                state: action.payload
            }
        case ORDER_ITEMS_CREATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}