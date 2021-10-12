import React, { useState, useEffect, useMemo } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile }  from '../actions/userActions'
import { getUserOrdersList } from '../actions/orderActions'
import Select from "react-select";
import countryList from "react-select-country-list";

const UserProfileScreen = ({ history }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [zipCode, setZipCode] = useState('');
    const [message,  setMessage] = useState(null)
    const [value, setValue] = useState('');
    const options = useMemo(()=>countryList().getData(), []);

    const changeHandler = value => {
        setValue(value)
    }

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile



    const userOrdersList = useSelector((state) => state.userOrdersList)
    const { loading: loadingOrders, error: errorOrders, orders } = userOrdersList

    const validateName = (enteredName) => {
        let re = /^[a-zA-Z ]{2,30}$/;
        return re.test(enteredName);
    }

    const validatePhoneNumber = (phoneNumber) => {
        let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return regex.test(phoneNumber);
    }

    const validateEmail = (enteredEmail) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(enteredEmail);
    }

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        } else {
            if(!user.email_id){
                dispatch(getUserDetails('profile', userInfo.user_id))
                dispatch(getUserOrdersList(userInfo.user_id))
            }
            else{
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email_id)
                setPhoneNumber(user.phone_number)
                setCity(user.city)
                setStreet(user.street)
                setProvince(user.province)
                setValue(value)
                setZipCode(user.zipCode)

            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(!validateName(firstName) || !validateName(lastName)){
            setMessage('Please enter a valid name')
        }
        if(!validateEmail(email)){
            setMessage('Please enter a valid email')
        }
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        if(password.length < 10){
            setMessage('Your password should contain atleast 10 characters')
        }
        if(!validatePhoneNumber(phoneNumber)){
            setMessage('Please enter a valid phone number')
        } else {
            dispatch(updateUserProfile(user.user_id, firstName, lastName, email, password, phoneNumber, street, city, province, value.label, zipCode))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='firstname'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter first name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='lastname'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter last name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='password'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
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
                        <Select options={options} value={value} onChange={changeHandler}/>
                    </Form.Group>
                    <br/>
                    <Form.Group controlId='zipCode'>
                        <Form.Label>ZIP Code</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='ZIP Code'
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                { loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table stripped bordered hover responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>VIEW RECEIPT</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.total_price}</td>
                                <td>
                                    <LinkContainer to={`order/${order.order_id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
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

export default UserProfileScreen