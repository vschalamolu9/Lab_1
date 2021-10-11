const authMiddleWare = require('../middleware/authMiddleware.js')
const orderItems = require("../controllers/orderItemsController.js");
const protect = authMiddleWare.protect;

module.exports = app => {

    const orders = require('../controllers/orderController.js');
    const orderItems = require('../controllers/orderItemsController.js');

    let router = require('express').Router();

    router.route('/newOrder').post(protect, orders.addNewOrder);
    router.route('/addorderitems').post(protect, orderItems.addOrderItems);

    router.route('/getuserorders').post(protect, orders.fetchUserOrders);
    router.route('/getorderbyid').post(protect, orders.fetchOrdersById);

    app.use('/api/users', router)

}