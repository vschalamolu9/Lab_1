import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listRestaurants} from "../actions/restaurantActions";
import {Row, Col} from 'react-bootstrap';
import Message from "../components/Message";
import Loader from "../components/Loader";
import Restaurant from "../components/Restaurant";
import RestaurantProfileScreen from "./RestaurantProfileScreen";

const HomeScreen = () => {
    const dispatch = useDispatch()

    const restaurantList = useSelector((state) => state.restaurantList)

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { restaurantInfo } = restaurantLogin

    const {loading, error, restaurants} = restaurantList;

    useEffect(() => {
        dispatch(listRestaurants())
    }, [dispatch])

    return(
        <>
            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : restaurantInfo ?  (<RestaurantProfileScreen />) : (
                <Row>
                    <h1>Restaurants</h1>
                    {restaurants.map(restaurant => (
                        <Col key={restaurant.restaurant_id} sm={12} md={6} lg={4} xl={3}>
                            <Restaurant restaurant={restaurant}/>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen