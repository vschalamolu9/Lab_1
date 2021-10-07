module.exports = app => {
    const items = require('../controllers/itemController.js');

    let router = require('express').Router();

    //Create a new Item
    router.post('/',items.create);

    router.get('/:id', items.findOne);

    app.use('/api/items', router);
}