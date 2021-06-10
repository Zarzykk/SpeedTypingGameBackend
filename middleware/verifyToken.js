const jwt = require('jsonwebtoken')
const { secretTokenString } =require('../config')

const generateToken = (req,res,next) =>{
    const authToken = req.header('token')
    if(!authToken) return res.status(401).send('You are not logged in!')
    try{
        const verifiedToken = jwt.verify(authToken,secretTokenString)
        req.user = verifiedToken
        next()
    }catch (err) {
        const error = {
            path: [],
        }
        res.status(400).send(error)
    }
}


module.exports = {
    generateToken
}