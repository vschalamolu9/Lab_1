const jwt = require('jsonwebtoken')

exports.generateToken = (id) => {
    return jwt.sign({id},"" + process.env.JWT_SECRET, {expiresIn: '30d'})
}

exports.generateRestaurantToken = (id, email) => {
    return jwt.sign({id, email},"" + process.env.JWT_SECRET, {expiresIn: '30d'})
}

