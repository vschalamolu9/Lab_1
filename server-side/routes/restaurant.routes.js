module.exports = app => {
    const restaurants = require('../controllers/restaurantController.js');

    let router = require('express').Router();

    //Create a new Restaurant
    router.post('/', restaurants.create);

    // Retrieve all restaurants
    router.get('/', restaurants.findAll);

    app.use('/api/restaurants', router);
}