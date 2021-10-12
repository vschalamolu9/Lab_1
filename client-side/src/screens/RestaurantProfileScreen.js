import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getRestaurantDetails, updateRestaurantProfile} from "../actions/restaurantActions";
import {getRestaurantOrdersList} from "../actions/orderActions";

const RestaurantProfileScreen = ({ location, history }) => {
    const [restaurantName, setRestaurantName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [restaurantEmail, setRestaurantEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [restaurantContact, setRestaurantContact] = useState('')
    const [restaurantStreet, setRestaurantStreet] = useState('')
    const [restaurantCity, setRestaurantCity] = useState('')
    const [restaurantState, setRestaurantState] = useState('')
    const [restaurantCountry, setRestaurantCountry] = useState('')
    const [restaurantZipCode, setRestaurantZipCode] = useState('')
    const [deliveryFee, setDeliveryFee] = useState('')
    const [minDeliveryTime, setMinDeliveryTime] = useState('')
    const [maxDeliveryTime, setMaxDeliveryTime] = useState('')
    const [message,  setMessage] = useState(null)

    const dispatch = useDispatch()

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { loading, error, restaurant } = restaurantDetails

    const restaurantLogin = useSelector((state) => state.restaurantLogin)
    const { restaurantInfo } = restaurantLogin

    const restaurantUpdateProfile = useSelector((state) => state.restaurantUpdateProfile)
    const { success } = restaurantUpdateProfile

    const restaurantOrdersList = useSelector((state) => state.restaurantOrdersList)
    const { loading: loadingOrders, error: errorOrders, orders } = restaurantOrdersList

    useEffect(() => {
        if(!restaurantInfo){
            history.push('/restaurant/home')
        }
        else{
            if(!restaurant){
                dispatch(getRestaurantDetails(restaurantInfo.restaurant_id))
                dispatch(getRestaurantOrdersList(restaurantInfo.restaurant_id))
            }
            else{
                dispatch(getRestaurantOrdersList(restaurantInfo.restaurant_id))
                //dispatch(getRestaurantDetails(restaurant.restaurant_id))
                setRestaurantName(restaurantInfo.restaurant_name)
                setImage(restaurantInfo.image)
                setDescription(restaurantInfo.description)
                setRestaurantEmail(restaurantInfo.restaurant_email)
                setRestaurantContact(restaurantInfo.restaurant_contact)
                setRestaurantStreet(restaurantInfo.restaurant_street)
                setRestaurantCity(restaurantInfo.restaurant_city)
                setRestaurantState(restaurantInfo.restaurant_state)
                setRestaurantCountry(restaurantInfo.restaurant_country)
                setRestaurantZipCode(restaurantInfo.restaurant_zip_code)
                setDeliveryFee(restaurantInfo.delivery_fee)
                setMinDeliveryTime(restaurantInfo.min_delivery_time)
                setMaxDeliveryTime(restaurantInfo.max_delivery_time)
            }
        }
    }, [dispatch, history, restaurantInfo, restaurant])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !=='' && confirmPassword !== ''){
            if (password !== confirmPassword) {
                setMessage('Passwords do not match')
            }
        }
        else{
            dispatch(updateRestaurantProfile(restaurantInfo.restaurant_id, restaurantName, image, description, restaurantEmail, password, restaurantContact, restaurantStreet, restaurantCity, restaurantState,
                restaurantCountry, restaurantZipCode, deliveryFee, minDeliveryTime, maxDeliveryTime
            ))
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h2>Restaurant Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Restaurant Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='restaurantName'>
                        <Form.Label>Restaurant Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Restaurant name'
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Upload image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='textarea'
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='restaurantEmail'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={restaurantEmail}
                            onChange={(e) => setRestaurantEmail(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='cnfPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId='restaurantContact'>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Contact Number'
                            value={restaurantContact}
                            onChange={(e) => setRestaurantContact(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId='restaurantStreet'>
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Street'
                            value={restaurantStreet}
                            onChange={(e) => setRestaurantStreet(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='restaurantCity'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='restaurantCity'
                            value={restaurantCity}
                            onChange={(e) => setRestaurantCity(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='restaurantState'>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Province or State'
                            value={restaurantState}
                            onChange={(e) => setRestaurantState(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='restaurantCountry'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Country'
                            value={restaurantCountry}
                            onChange={(e) => setRestaurantCountry(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>Restaurant Orders</h2>
                { loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table stripped bordered hover responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>ORDER TYPE</th>
                            <th>TOTAL</th>
                            <th>VIEW RECEIPT</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.order_type}</td>
                                <td>{order.total_price}</td>
                                <td>
                                    <LinkContainer to={`/order/${order.order_id}`}>
                                        <Button className='btn-sm' variant='light' disabled>View Order</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default RestaurantProfileScreen