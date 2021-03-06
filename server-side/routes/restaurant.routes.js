const authMiddleWare = require('../middleware/authMiddleware.js')
const orders = require("../controllers/orderController.js");
const protectRestaurant = authMiddleWare.protectRestaurant;

module.exports = app => {
    const restaurants = require('../controllers/restaurantController.js');
    const items = require('../controllers/itemController.js');

    let router = require('express').Router();

    //Create a new Restaurant
    router.post('/register', restaurants.restaurantRegister);

    router.post('/login', restaurants.restaurantLogin)

    // Retrieve all restaurants
    router.get('/', restaurants.findAll);

    //Retrieve all Items of restaurants
    router.get(`/:restaurant_id`, items.findAllItems);

    router.route('/getitems').post(protectRestaurant, items.findAllItems);

    router.route('/getrestaurantorders').post(protectRestaurant, orders.fetchRestaurantOrders);

    router.route('/profile').put(protectRestaurant, restaurants.updateRestaurantProfile);

    router.route('/getorderbyid').post(orders.fetchOrdersById);

    router.route('/profile').post(restaurants.findRestaurant);

    app.use('/api/restaurants', router);
}