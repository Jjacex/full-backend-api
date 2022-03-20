const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    let token

    //tokens start with Bearer, so we can check to see if this is included in the req.headers.authorization
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get token from header
            //we split this into an array and 0 will contain "Bearer" and 1 will cointain the token
            token = req.headers.authorization.split(' ')[1]

            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from the token
            //this is now available in any controller function ran after this piece of middleware
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorize, no token')
    }
})

module.exports = {
    protect
}