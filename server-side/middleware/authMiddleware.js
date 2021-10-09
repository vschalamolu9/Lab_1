const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async(req, res, next) => {
    let token = null

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token= req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, ""+process.env.JWT_SECRET)

            User.findByPk(decoded.id).then(data => {
                if(data){
                    console.log('Authorization success')
                    next()
                }
                else{
                    throw new Error('User_id not found, token failed')
                }
            })
        }
        catch(error){
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }

        if(!token){
            res.status(401)
            throw new Error('Not authorized, no token')
        }
    }
})

module.exports = protect