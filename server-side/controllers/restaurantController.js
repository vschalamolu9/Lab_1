const db = require('../models');
const Restaurant = db.restaurants;
const Op = db.sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    if(!req.body.restaurant_name){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const restaurant = {
        restaurant_name: req.body.restaurant_name,
        image: req.body.image,
        description: req.body.description,
        restaurant_street: req.body.restaurant_street,
        restaurant_city: req.body.restaurant_city,
        restaurant_state: req.body.restaurant_state,
        restaurant_zip_code: req.body.restaurant_zip_code,
        delivery_fee: req.body.delivery_fee,
        min_delivery_time: req.body.min_delivery_time,
        max_delivery_time: req.body.max_delivery_time,
        rating: req.body.rating,
        num_reviews: req.body.num_reviews

    }

    Restaurant.create(restaurant).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Tutorial.'
        })
    })
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

    Restaurant.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving restaurants.'
            });
        });

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};