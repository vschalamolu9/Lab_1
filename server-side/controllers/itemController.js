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
        description: req.body.description,
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

    const restaurant_id = req.params.restaurant_id || req.body.restaurant_id;

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

exports.updateItem = (req, res) => {

    Item.findOne({where: {item_id: req.body.item_id}})
        .then(data => {
            data.item_name = req.body.item_name || data.item_name
            data.image = req.body.image || data.image
            data.description = req.body.description || data.description
            data.item_price = req.body.item_price || data.item_price
            data.min_cal = req.body.min_cal || data.min_cal
            data.max_cal = req.body.max_cal || data.max_cal


            data.save().then(
                res.status(200).json({
                    item_name : data.item_name,
                    image : data.image,
                    description: data.description,
                    item_price : data.item_price,
                    min_cal : data.min_cal,
                    max_cal : data.max_cal
                })
            ).catch((error) => {
                res.status(403).send({
                    message: error.message || 'Some error occurred while updating.'
                })
            })
        }).catch(err => {
            res.status(500).send({
                message : err.message || 'Some error occurred while retrieving Restaurant profile.'
            })
    })
}
