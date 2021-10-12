import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {listItemDetails, updateItem} from "../actions/itemActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Form} from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const UpdateItemScreen = ({match, history}) => {

    const [itemName, setItemName] =useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] =useState('')
    const [itemPrice, setItemPrice] = useState('')
    const [minCal, setMinCal] = useState('')
    const [maxCal, setMaxCal] = useState('')

    const dispatch = useDispatch()

    const itemDetails = useSelector(state => state.itemDetails)
    const { loading, error, item} = itemDetails

    useEffect(() => {
        if(item.item_name){
            setItemName(item.item_name)
            setImage(item.image)
            setDescription(item.description)
            setItemPrice(item.item_price)
            setMinCal(item.min_cal)
            setMaxCal(item.max_cal)
        }
        else{
            dispatch(listItemDetails(match.params.id))
        }

    }, [dispatch, item])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateItem(item.item_id, itemName, image, description, itemPrice, minCal, maxCal, item.restaurantRestaurantId))
    }

    return(
        <FormContainer>
            <h1>Update Item</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='itemName'>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Item name'
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Upload Image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        type='textarea'
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='itemPrice'>
                    <Form.Label>Item Price</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Price'
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='minCal'>
                    <Form.Label>Minimum Calories</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Min Cal.'
                        value={minCal}
                        onChange={(e) => setMinCal(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='maxCal'>
                    <Form.Label>Maximum Calories</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Max Cal'
                        value={maxCal}
                        onChange={(e) => setMaxCal(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Button type='submit' variant='primary'>
                    Confirm
                </Button>
            </Form>
        </FormContainer>
    )
}

export default UpdateItemScreen