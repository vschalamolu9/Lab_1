const {getUserProfile} = require("../controllers/userController");
const authMiddleWare = require('../middleware/authMiddleware.js')
const protect = authMiddleWare.protect;

module.exports = app => {

    const users = require('../controllers/userController.js');

    let router = require('express').Router();

    router.post('/register', users.registerUser);
    router.post('/login', users.loginUser);
    router.route('/profile').get(protect, getUserProfile)

    app.use('/api/users', router)

}