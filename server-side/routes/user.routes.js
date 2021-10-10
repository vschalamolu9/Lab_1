const {getUserProfile, updateUserProfile} = require("../controllers/userController");
const authMiddleWare = require('../middleware/authMiddleware.js')
const protect = authMiddleWare.protect;

module.exports = app => {

    const users = require('../controllers/userController.js');

    let router = require('express').Router();

    router.post('/register', users.registerUser);
    router.post('/login', users.loginUser);
    router.route('/profile').post(protect, getUserProfile).put(protect, updateUserProfile)

    app.use('/api/users', router)

}