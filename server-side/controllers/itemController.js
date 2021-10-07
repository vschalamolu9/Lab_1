const db = require('../models');
const Item = db.items;
const Op = db.sequelize.Op;

//Create and Save a new Item
exports.create = (req, res) => {

    if(!req.body.item_name){
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }

    const item = {
        item_name: req.body.item_name,
        restaurantRestaurantId: req.body.restaurantRestaurantId,
        image: req.body.image,
        item_price: req.body.item_price,
        min_cal: req.body.min_cal,
        max_cal: req.body.max_cal
    }

    Item.create(item).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Item.'
        })
    })
}

//find all Items of a Restaurant
exports.findAllItems = (req, res) =>{

    const restaurant_id = req.params.restaurant_id;

    Item.findAll({where: {restaurantRestaurantId : restaurant_id}}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving Items.'
        })
    })
}

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

    const item_id = req.params.id;

    Item.findOne({where: { item_id : item_id}}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving Item.'
        })
    })
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