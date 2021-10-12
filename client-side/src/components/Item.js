import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Item = ({item}) => {

    return(
        <Card className='my-6 p-3 rounded'>
            <Link to={`/item/${item.item_id}`}>
                <Card.Img src={item.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/item/${item.item_id}`}>
                    <Card.Title as='div'><strong>{item.item_name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Card.Text as='h7'>{`$${item.item_price} | ${item.min_cal} - ${item.max_cal} Cal.`}</Card.Text>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Item;