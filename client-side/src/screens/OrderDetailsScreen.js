import React, { useEffect } from 'react'
import {Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getOrderDetails, getRestaurantOrderDetails} from "../actions/orderActions";
import {Link} from "react-router-dom";
import {getUserDetails} from "../actions/userActions";

const OrderDetailsScreen = ({match}) => {

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading: loadingUser, error: loadingUserError, user } = userDetails

    const order_id = match.params.id

    useEffect(() => {
        dispatch(getOrderDetails(order_id))
        if(!user){
            dispatch(getUserDetails('profile',order.userUserId))
        }
    }, [match])

    const customer = !userInfo ? user : userInfo;

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            { order_id && <Message variant='success'>Order Placed Successfully</Message>}
            <Row>
                <h1>Order: {order_id}</h1>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Delivery</h2>
                            <p>
                                <strong>Name: {customer.first_name} {customer.last_name}</strong>
                            </p>
                            <p>
                                Email: <Link to={`${customer.email_id}`}>{customer.email_id}</Link>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.delivery_address}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {order.payment_method}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Type</h2>
                            <strong>Type: </strong>
                            {order.order_type}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Your cart is empty</Message> : (<ListGroup variant='flush'>{order.orderItems.map((orderItem, index) => (<ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={orderItem.item.image} alt={orderItem.item.name} fluid rounded />
                                    </Col>
                                    <Col>
                                        <Link to={`/item/${orderItem.item.item_id}`}>{orderItem.item.item_name}</Link>
                                    </Col>
                                    <Col md={4}>{orderItem.quantity} x ${orderItem.item.item_price} = ${orderItem.quantity * orderItem.item.item_price}</Col>
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
                                    <Col>${order.items_price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Delivery</Col>
                                    <Col>${order.delivery_fee}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.tax_price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.total_price}</Col>
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default OrderDetailsScreen