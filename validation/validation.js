const Joi = require('joi')

const validateRegisterAndLogin = (data) =>{
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(20).required(),
    })

    return schema.validate(data)
}


module.exports ={
    validateRegisterAndLogin
}