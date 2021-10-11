import React from 'react'
import {Button, Col, Row, Table} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const RestaurantItemsScreen = () => {



    return(
        <>
            <Row>
                <Col md={9}>
                    <h2>View Menu Items</h2>
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
                                            <Button className='btn-sm' variant='light'>View Receipt</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default RestaurantItemsScreen
