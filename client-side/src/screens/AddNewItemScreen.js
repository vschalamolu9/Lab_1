import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addNewMenuItem} from "../actions/itemActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Form} from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const AddNewItemScreen = ({ history}) => {

    const [itemName, setItemName] =useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] =useState('')
    const [itemPrice, setItemPrice] = useState('')
    const [minCal, setMinCal] = useState('')
    const [maxCal, setMaxCal] = useState('')

    const dispatch = useDispatch()

    const addNewItem = useSelector(state => state.addNewItem)
    const {loading, error, success, itemInfo} = addNewItem

    const restaurantLogin = useSelector((state) => state.restaurantLogin)
    const { restaurantInfo } = restaurantLogin

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addNewMenuItem(itemName, description, image, itemPrice, minCal, maxCal, restaurantInfo.restaurant_id))
        history.push('/restaurant/profile')
    }

    return(
        <FormContainer>
            <h1>Add New Item</h1>
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

export default AddNewItemScreen