import React, { useEffect } from 'react'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import CheckOutSteps from "../constants/checkOutSteps";
import {createOrder} from "../actions/orderActions";
import {createOrderItems} from "../actions/orderItemsActions";
import {Link} from "react-router-dom";

const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }

    //Calculate prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.deliveryPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.deliveryPrice) + Number(cart.taxPrice)).toFixed(2)

    const delivery_address = `${cart.deliveryAddress.street}, ${cart.deliveryAddress.city}, ${cart.deliveryAddress.province}, ${cart.deliveryAddress.country}`

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success, error} = orderCreate

    useEffect(() => {
        if(success){
            for(let i=0; i<cart.cartItems.length; i++){
                dispatch(createOrderItems(
                    cart.cartItems[i].qty,
                    cart.cartItems[i].product,
                    order.order_id
                ))
            }
            history.push(`/order/${order.order_id}`)
        }
        //eslint-disable-next-line
    }, [history, success])


    const placeOrderHandler = () => {
        dispatch(createOrder(
            cart.itemsPrice,
            cart.taxPrice,
            cart.deliveryPrice,
            cart.totalPrice,
            "DELIVERY",
            cart.paymentMethod,
            delivery_address,
            userInfo.user_id,
            cart.cartItems[0].restaurant_id
        ))

    }

    return(
        <>
            <CheckOutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Delivery</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.deliveryAddress.street}, {cart.deliveryAddress.city}{' '}
                                {cart.deliveryAddress.province}, {cart.deliveryAddress.zipCode}{' '}
                                {cart.deliveryAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (<ListGroup variant='flush'>{cart.cartItems.map((item, index) => (<ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col>
                                        <Link to={`/item/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>{item.qty} x ${item.price} = ${item.qty * item.price}</Col>
                                </Row>
                            </ListGroup.Item>))}</ListGroup>)}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Delivery</Col>
                                    <Col>${cart.deliveryPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen