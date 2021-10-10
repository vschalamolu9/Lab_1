const db = require('../models');
const User = db.users;
const tokenModule = require('../utils/generateToken.js')
const generateToken = tokenModule.generateToken

//User auth and login
exports.loginUser = (req, res) => {


    User.findOne({where : {email_id: req.body.email}}).then(user => {
        if(!user){
            res.status(400).send({
                message: 'Unable to find user.'
            })
        }
        else{
            if(user.password === req.body.password){
                res.status(200).json({
                    user_id : user.user_id,
                    first_name : user.first_name,
                    last_name : user.last_name,
                    email_id : user.email_id,
                    phone_number : user.phone_number,
                    street : user.street,
                    city : user.city,
                    province : user.province,
                    country : user.country,
                    token: generateToken(user.user_id)
                });
            }
            else{
                res.status(400).send({
                    message: 'Incorrect password.'
                })
            }
        }
    }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while logging in User.'
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
        });
    });
}

//Get User Profile
exports.getUserProfile = (req, res) => {

    User.findOne({where: {user_id: req.body.user_id}})
        .then(data => {
            res.status(200).json({
                user_id : data.user_id,
                first_name : data.first_name,
                last_name : data.last_name,
                email_id: data.email_id,
                phone_number: data.phone_number,
                street: data.street,
                city: data.city,
                province: data.province,
                country: data.country,
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving User profile.'
            });
        });
}

//Update User Profile
exports.updateUserProfile = (req, res) => {

    User.findOne({where: {user_id: req.body.user_id}})
        .then(data => {
            data.first_name = req.body.first_name || data.first_name
            data.last_name = req.body.last_name || data.last_name
            data.email_id = req.body.email_id || data.email_id
            if(req.body.password){
                data.password = req.body.password || data.password
            }
            data.phone_number = req.body.phone_number || data.phone_number
            data.street = req.body.street || data.street
            data.city = req.body.city || data.city
            data.province = req.body.province || data.province
            data.country = req.body.country || data.country

            data.save().then(
                res.status(200).json({
                    user_id : data.user_id,
                    first_name : data.first_name,
                    last_name : data.last_name,
                    email_id: data.email_id,
                    phone_number: data.phone_number,
                    street: data.street,
                    city: data.city,
                    province: data.province,
                    country: data.country,
                    token: generateToken(data.user_id)
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

