const db = require('../models');
const Order = db.orders;
const OrderItems = db.orderItems;
const tokenModule = require('../utils/generateToken.js')
const generateToken = tokenModule.generateToken
const QueryTypes = require('sequelize')
const Op = db.sequelize.Op;

//Add New Order
exports.addNewOrder = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const order = {
        items_price: req.body.items_price,
        tax_price: req.body.tax_price,
        delivery_fee: req.body.delivery_fee,
        total_price: req.body.total_price,
        order_type: req.body.order_type,
        payment_method: req.body.payment_method,
        delivery_address: req.body.delivery_address,
        userUserId: req.body.userUserId,
        restaurantRestaurantId: req.body.restaurantRestaurantId
    }

    Order.create(order).then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while placing order.'
        });
    });
}

exports.fetchOrdersById = (req, res) => {
    if(!req.body.order_id){
        res.status(400).send({
            message: "Unable to find order id."
        })
        return;
    }

    const order_id = req.body.order_id

    Order.findOne({include: [{model: db.orderItems, include: [{model: db.items}]}], where: {order_id: order_id}}).then(order_data => {
        if(!order_data){
            res.status(400).send({
                message: 'Unable to find order with the given order id'
            })
            return;
        }
        res.send(order_data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to get the order.'
        });
    });

}

exports.fetchUserOrders = (req, res) => {

    if(!req.body.user_id){
        res.status(400).send({
            message: "User should be logged in."
        });
        return;
    }

    const user_id = req.body.user_id;


    Order.findAll({include: [{model: db.orderItems, include: [{model: db.items}]}], where: {userUserId: user_id}}).then(orders => {

        if(!orders){
            res.status(400).send({
                message: 'Unable to find orders for you.'
            })
            return;
        }
        res.send(orders)
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to get user orders.'
        });
    });
}

exports.fetchRestaurantOrders = async(req, res) => {

    if(!req.body.restaurant_id){
        res.status(400).send({
            message: "Restaurant should be logged in."
        });
        return;
    }

    const restaurant_id = req.body.restaurant_id

    Order.findAll({include: [{model: db.orderItems, include: [{model: db.items}]}], where: {restaurantRestaurantId: restaurant_id}}).then(orders => {

        if(!orders){
            res.status(400).send({
                message: 'Unable to find orders for your restaurant.'
            })
            return;
        }
        res.send(orders)
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Unable to get restaurant orders.'
        });
    });
}
