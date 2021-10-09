import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {registerRestaurant} from "../actions/restaurantActions";

const RegisterRestaurantScreen = ({ location, history }) => {
    const [restaurantName, setRestaurantName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [country, setCountry] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [deliveryFee, setDeliveryFee] = useState('')
    const [minDeliveryTime, setMinDeliveryTime] = useState('')
    const [maxDeliveryTime, setMaxDeliveryTime] = useState('')
    const [message,  setMessage] = useState(null)

    const dispatch = useDispatch()

    const restaurantRegister = useSelector((state) => state.restaurantRegister)
    const { loading, error, restaurantData } = restaurantRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (restaurantData) {
            history.push(redirect)
        }
    }, [history, restaurantData, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(registerRestaurant(restaurantName, image, description, email,password, phoneNumber, street, city, province,
                country, zipCode, deliveryFee, minDeliveryTime, maxDeliveryTime))
        }

    }

    return (
        <FormContainer>
            <h1>Restaurant Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='restaurantName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
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
                        required
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
                        as = 'textarea'
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group controlId='phoneNumber'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Phone Number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group controlId='street'>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Street'
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='province'>
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Province or State'
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='zipCode'>
                    <Form.Label>Zip code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='ZIP Code'
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='deliveryFee'>
                    <Form.Label>Delivery fee</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Delivery fee'
                        value={deliveryFee}
                        onChange={(e) => setDeliveryFee(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='minDeliveryTime'>
                    <Form.Label>Minimum delivery time</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Minimum delivery time'
                        value={minDeliveryTime}
                        onChange={(e) => setMinDeliveryTime(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='maxDeliveryTime'>
                    <Form.Label>Maximum delivery time</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Maximum delivery time'
                        value={maxDeliveryTime}
                        onChange={(e) => setMaxDeliveryTime(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Button type='submit' variant='primary'>
                    Sign Up Restaurant
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/restaurant/home?redirect=${redirect}` : '/restaurant/home'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterRestaurantScreen