import {ITEM_LIST_REQUEST, ITEM_LIST_SUCCESS, ITEM_LIST_FAIL, ITEM_DETAILS_REQUEST, ITEM_DETAILS_SUCCESS, ITEM_DETAILS_FAIL} from "../constants/itemConstants";
import Axios from 'axios';

export const listItems = (id) => async(dispatch) => {

    try{
        dispatch({type: ITEM_LIST_REQUEST})
        const {data} = await Axios.get(`http://localhost:5000/api/restaurants/${id}`)
        dispatch({type: ITEM_LIST_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({type: ITEM_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const listItemDetails = (id) => async(dispatch) => {

    try{
        dispatch({type: ITEM_DETAILS_REQUEST})

        const {data} = await Axios.get(`http://localhost:5000/api/items/${id}`)

        dispatch({type: ITEM_DETAILS_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: ITEM_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}