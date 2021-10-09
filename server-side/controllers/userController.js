const db = require('../models');
const User = db.users;
const tokenModule = require('../utils/generateToken.js')
const generateToken = tokenModule.generateToken

//User auth and login
exports.loginUser = (req, res) => {

    User.findOne({email: req.body.email, password: req.body.password})
        .then(data => {
            res.status(200).json({
                user_id : data.user_id,
                first_name : data.first_name,
                last_name : data.last_name,
                email_id : data.email_id,
                phone_number : data.phone_number,
                street : data.street,
                city : data.city,
                province : data.province,
                country : data.country,
                token: generateToken(data.user_id)
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving User.'
            });
        });
}

//Register User
exports.registerUser = (req, res) => {

    if(!req.body.email_id){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_id: req.body.email_id,
        password: req.body.password,
        phone_number: req.body.phone_number,
        street: req.body.street,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
    }

    User.create(user).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the User.'
        })
    })
}

exports.getUserProfile = (req, res) => {

    User.findOne({user_id: req.body.user_id})
        .then(data => {
            res.status(200).json({
                user_id : data.user_id,
                first_name : data.first_name,
                last_name : data.last_name
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving restaurants.'
            });
        });
}

