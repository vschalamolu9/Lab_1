const authMiddleWare = require('../middleware/authMiddleware.js')
const orderItems = require("../controllers/orderItemsController.js");
const protect = authMiddleWare.protect;

module.exports = app => {

    const orders = require('../controllers/orderController.js');
    const orderItems = require('../controllers/orderItemsController.js');

    let router = require('express').Router();

    router.route('/newOrder').post(protect, orders.addNewOrder);
    router.route('/addorderitems').post(protect, orderItems.addOrderItems);

    app.use('/api/users', router)

}