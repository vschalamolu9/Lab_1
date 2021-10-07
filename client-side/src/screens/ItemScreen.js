import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from "react-bootstrap";
import {listItemDetails} from "../actions/itemActions";
import Loader from '../components/Loader';
import Message from '../components/Message';

const ItemScreen = ({match}) => {

    const dispatch = useDispatch();

    const itemDetails = useSelector((state)=>state.itemDetails)

    const {loading, error, item} = itemDetails

    useEffect(()=>{
        dispatch(listItemDetails(match.params.id))
    }, [dispatch, match])

    return(
        <>
            <Link className='btn btn-light my-3' to="/">Go Back</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<Row>
                <Col md={6}>
                    <Image src={item.image} alt={item.name} fluid></Image>
                </Col>
                <Col md={6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{item.item_name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${item.item_price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Calories: {item.max_cal} Cal.
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Button className='btn-block' type='button'>Add to Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>)}
        </>
    )
}

export default ItemScreen;