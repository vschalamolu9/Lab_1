import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl} from "react-bootstrap";
import {listItemDetails} from "../actions/itemActions";
import Loader from '../components/Loader';
import Message from '../components/Message';

const ItemScreen = ({match, history}) => {

    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();

    const itemDetails = useSelector((state)=>state.itemDetails)

    const {loading, error, item} = itemDetails

    useEffect(()=>{
        dispatch(listItemDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = (e) => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return(
        <>
            <Link className='btn btn-light my-3' to="/">Go Back</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<Row>
                <Col md={6}>
                    <Image src={item.image} alt={item.item_name} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{item.item_name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${item.item_price}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${item.item_price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <FormControl as='select' value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                                            {[...Array(5).keys()].map( x => (
                                                <option key={x + 1} value={x + 1}>
                                                    { x + 1}
                                                </option>))}
                                        </FormControl>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block' type='button' onClick={addToCartHandler}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>)}
        </>
    )
}

export default ItemScreen;