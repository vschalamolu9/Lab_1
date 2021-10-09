import React from 'react';
import {Card} from 'react-bootstrap';
import Rating from './Rating';
import {Link} from 'react-router-dom';

const Restaurant = ({restaurant}) => {

    return(
        <>
            <h1>Restaurants</h1>
            <Card className='my-3 p-3 rounded'>
                <Link to={`/restaurants/${restaurant.restaurant_id}`}>
                    <Card.Img src={restaurant.image} variant='top'>
                    </Card.Img>
                </Link>
                <Card.Body>
                    <Link to={`/restaurants/${restaurant.restaurant_id}`}>
                        <Card.Title as='div'><strong>{`${restaurant.restaurant_name} (${restaurant.restaurant_street})`}</strong></Card.Title>
                    </Link>
                    <Card.Text as='div'>
                        { restaurant.rating && <Rating value={restaurant.rating} text={`${restaurant.num_reviews} reviews`} /> }
                    </Card.Text>
                    <br/>
                    <Card.Text as='h7'>{`$${restaurant.delivery_fee} Delivery Fee | ${restaurant.min_delivery_time}-${restaurant.max_delivery_time} mins`}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )

}

export default Restaurant;