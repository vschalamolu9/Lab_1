import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {listItems} from "../actions/itemActions";
import Item from "../components/Item";

const MenuScreen = ({match}) => {
    const dispatch = useDispatch()
    const itemList = useSelector((state) => state.itemList)
    const { loading, error, items} = itemList;

    useEffect(()=>{
        dispatch(listItems(match.params.id))
    }, [dispatch, match])

    return(
        <>
            {loading && (<Loader />)}
            {error && (<Message variant='danger'>{error}</Message>)}
            <Row>
                <h1>Menu Items</h1>
                {items.map(item => (
                    <Col key={item.item_id} sm={12} md={6} lg={4} xl={3}>
                        <Item item={item}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default MenuScreen;