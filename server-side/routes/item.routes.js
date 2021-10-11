const authMiddleWare = require('../middleware/authMiddleware.js')
const protectRestaurant = authMiddleWare.protectRestaurant;

module.exports = app => {
    const items = require('../controllers/itemController.js');

    let router = require('express').Router();

    //Create a new Item
    router.post('/',items.create);

    router.get('/:id', items.findOne);

    router.route('/update').put(protectRestaurant, items.updateItem)

    app.use('/api/items', router);
}