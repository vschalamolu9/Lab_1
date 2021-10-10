const db = require('../models');
const Order = db.orders;
const tokenModule = require('../utils/generateToken.js')
const generateToken = tokenModule.generateToken

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
