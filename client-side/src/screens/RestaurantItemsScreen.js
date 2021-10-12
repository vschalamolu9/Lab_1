import React, {useEffect} from 'react'
import {Button, Col, Image, Row, Table} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {LinkContainer} from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {restaurantMenuItemsList} from "../actions/restaurantActions";
import {deleteItem} from "../actions/itemActions";
import {Link} from "react-router-dom";

const RestaurantItemsScreen = () => {

    const dispatch = useDispatch()

    const restaurantLogin = useSelector((state) => state.restaurantLogin)
    const { restaurantInfo } = restaurantLogin

    const restaurantItemsList = useSelector((state) => state.restaurantItemsList)
    const { loading, error, restaurantMenuItems } = restaurantItemsList

    useEffect(()=>{
        dispatch(restaurantMenuItemsList(restaurantInfo.restaurant_id))
    }, [dispatch])

    /*const itemDeleteHandler = (e) => {
        e.preventDefault()
        dispatch(deleteItem(temp))
    }*/

    return(
        <>
            <Row>
                <Col md={9}>
                    <h3>View Menu Items</h3>
                    <Row>
                        <Col md={6}>
                            <LinkContainer to = '/restaurant/addnewitem'>
                                <Button className='btn-sm' variant='primary'>ADD NEW ITEM</Button>
                            </LinkContainer>
                        </Col>
                    </Row>
                    <br/>
                    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        <Table stripped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>ITEM PRICE</th>
                                <th>UPDATE ITEM</th>
                                <th>DELETE ITEM</th>
                            </tr>
                            </thead>
                            <tbody>
                            {restaurantMenuItems.map(item => (
                                <tr key={item.item_id}>
                                    <td>{item.item_id}</td>
                                    <td>
                                        <Col md={2} sm={2}>
                                            <Image src={item.image} alt={item.item_name} fluid />
                                        </Col>
                                    </td>
                                    <td>{item.item_name}</td>
                                    <td>{item.item_price}</td>
                                    <td>
                                        <LinkContainer to={`/itemupdate/${item.item_id}`}>
                                            <Button className='btn-sm' variant='light'>UPDATE</Button>
                                        </LinkContainer>
                                    </td>
                                    <td>
                                        <Link to='/'>
                                            <Button className='btn-sm' variant='light'>DELETE</Button>
                                        </Link>
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
