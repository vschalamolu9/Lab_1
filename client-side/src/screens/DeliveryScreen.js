import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveDeliveryAddress} from "../actions/cartActions";
import CheckOutSteps from "../components/checkOutSteps";

const DeliveryScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const {deliveryAddress} = cart

    const [street, setStreet] = useState(deliveryAddress.street)
    const [city, setCity] = useState(deliveryAddress.city)
    const [province, setProvince] = useState(deliveryAddress.province)
    const [zipCode, setZipCode] = useState(deliveryAddress.zipCode)
    const [country, setCountry] = useState(deliveryAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveDeliveryAddress({street, city, province, zipCode, country}))
        history.push('/payment')
    }

    return(
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Delivery</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='street'>
                    <Form.Label>Street address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Building, Street & Unit'
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
                    <Form.Label>State/Province</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='State / Province'
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='country'>
                    <Form.Label>ZIP code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='ZIP Code'
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
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
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default DeliveryScreen;