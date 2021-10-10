const db = require('../models');
const OrderItems = db.orderItems;
const tokenModule = require('../utils/generateToken.js')
const generateToken = tokenModule.generateToken

//Add New Order
exports.addOrderItems = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const orderItems = {
        itemItemId : req.body.itemItemId,
        orderOrderId : req.body.orderOrderId,
        quantity : req.body.quantity
    }

    OrderItems.create(orderItems).then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while inserting new order item.'
        });
    });
}