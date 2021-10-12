const db = require('../models');
const Restaurant = db.restaurants;
const Op = db.sequelize.Op;
const tokenModule = require('../utils/generateToken.js')
const generateRestaurantToken = tokenModule.generateRestaurantToken;

// Create and Save a new Restaurant
exports.restaurantRegister = (req, res) => {

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
        restaurant_email: req.body.restaurant_email,
        password: req.body.password,
        restaurant_contact: req.body.restaurant_contact,
        restaurant_street: req.body.restaurant_street,
        restaurant_city: req.body.restaurant_city,
        restaurant_state: req.body.restaurant_state,
        restaurant_country: req.body.restaurant_country,
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
            message: err.message || 'Some error occurred while creating the Restaurant.'
        })
    })
};

// Retrieve all Restaurants from the database.
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

exports.restaurantLogin = (req, res) => {

    Restaurant.findOne({where: {restaurant_email: req.body.restaurant_email}}).then(data => {
        if(!data){
            res.status(400).send({
                message: 'Unable to find restaurant.'
            })
        }
        else{
            if(data.password === req.body.password){
                res.status(200).send({
                    restaurant_id : data.restaurant_id,
                    restaurant_name: data.restaurant_name,
                    image: data.image,
                    description: data.description,
                    restaurant_email: data.restaurant_email,
                    restaurant_contact: data.restaurant_contact,
                    restaurant_street: data.restaurant_street,
                    restaurant_city: data.restaurant_city,
                    restaurant_state: data.restaurant_state,
                    restaurant_zip_code: data.restaurant_zip_code,
                    restaurant_country: data.restaurant_country,
                    delivery_fee: data.delivery_fee,
                    min_delivery_time: data.min_delivery_time,
                    max_delivery_time: data.max_delivery_time,
                    rating: data.rating,
                    num_reviews: data.num_reviews,
                    token: generateRestaurantToken(data.restaurant_id, data.restaurant_email)
                })
            }
            else{
                res.status(400).send({
                    message: 'Incorrect password.'
                })
            }
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while logging in Restaurant.'
        });
    });



}


exports.updateRestaurantProfile = (req, res) => {

    Restaurant.findOne({where: {restaurant_id: req.body.restaurant_id}})
        .then(data => {
            data.restaurant_name = req.body.restaurant_name || data.restaurant_name
            data.image = req.body.image || data.image
            data.description = req.body.description || data.description
            data.restaurant_email = req.body.restaurant_email || data.restaurant_email
            if(req.body.password){
                data.password = req.body.password || data.password
            }
            data.restaurant_contact = req.body.restaurant_contact || data.restaurant_contact
            data.restaurant_street = req.body.restaurant_street || data.restaurant_street
            data.restaurant_city = req.body.restaurant_city || data.restaurant_city
            data.restaurant_state = req.body.restaurant_state || data.restaurant_state
            data.restaurant_country = req.body.restaurant_country || data.restaurant_country
            data.restaurant_zip_code = req.body.restaurant_zip_code || data.restaurant_zip_code
            data.delivery_fee = req.body.delivery_fee || data.delivery_fee
            data.min_delivery_time = req.body.min_delivery_time || data.min_delivery_time
            data.max_delivery_time = req.body.max_delivery_time || data.max_delivery_time


            data.save().then(
                res.status(200).json({
                    restaurant_name : data.restaurant_name,
                    image : data.image,
                    description : data.description,
                    restaurant_email : data.restaurant_email,
                    restaurant_contact : data.restaurant_contact,
                    restaurant_street : data.restaurant_street,
                    restaurant_city : data.restaurant_city,
                    restaurant_state : data.restaurant_state,
                    restaurant_country : data.restaurant_country,
                    restaurant_zip_code : data.restaurant_zip_code,
                    delivery_fee : data.delivery_fee,
                    min_delivery_time : data.min_delivery_time,
                    max_delivery_time : data.max_delivery_time,
                    token: generateRestaurantToken(data.restaurant_id, data.restaurant_email)
                })
            ).catch((error) => {
                res.status(403).send({
                    message: error.message || 'Some error occurred while updating'
                })
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving User profile.'
            });
        });
}

// Find a single Tutorial with an id
exports.findRestaurant = (req, res) => {

    Restaurant.findOne({where :{ restaurant_id : req.body.restaurant_id}}).then(data => {
        if(!data){
            res.status(400).send({
                message: 'Unable to find restaurant.'
            })
        }
        res.status(200).send({
            restaurant_name : data.restaurant_name,
            image : data.image,
            description : data.description,
            restaurant_email : data.restaurant_email,
            restaurant_contact : data.restaurant_contact,
            restaurant_street : data.restaurant_street,
            restaurant_city : data.restaurant_city,
            restaurant_state : data.restaurant_state,
            restaurant_country : data.restaurant_country,
            restaurant_zip_code : data.restaurant_zip_code,
            delivery_fee : data.delivery_fee,
            min_delivery_time : data.min_delivery_time,
            max_delivery_time : data.max_delivery_time,
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving User profile.'
        });
    });
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