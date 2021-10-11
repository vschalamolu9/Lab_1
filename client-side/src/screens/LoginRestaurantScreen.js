import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {restaurantSignin} from "../actions/restaurantActions";

const LoginRestaurantScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const restaurantLogin = useSelector((state) => state.restaurantLogin)
    const { loading, error, restaurantInfo } = restaurantLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (restaurantInfo) {
            history.push(redirect)
        }
    }, [history, restaurantInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(restaurantSignin(email, password))
    }

    return (
        <FormContainer>
            <h1>Restaurant Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
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
                <Button type='submit' variant='primary'>
                    Sign In as Restaurant
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Restaurant?{' '}
                    <Link to={redirect ? `/restaurant/register?redirect=${redirect}` : '/restaurant/register'}>
                        Sign Up as Restaurant
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginRestaurantScreen