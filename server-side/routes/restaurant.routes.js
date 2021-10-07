module.exports = app => {
    const restaurants = require('../controllers/restaurantController.js');
    const items = require('../controllers/itemController.js');

    let router = require('express').Router();

    //Create a new Restaurant
    router.post('/', restaurants.create);

    // Retrieve all restaurants
    router.get('/', restaurants.findAll);

    //Retrieve all Items of restaurants
    router.get(`/:restaurant_id`, items.findAllItems);

    app.use('/api/restaurants', router);
}