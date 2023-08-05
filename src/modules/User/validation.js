import Joi from "joi";


export const change_password =Joi.object({
    oldPassword: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)),
    newPassword: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)),
    // authorization:Joi.string().required().pattern(new RegExp(`^${process.env.TOKEN_BEARER}`))
}).required()

export const update =Joi.object({
    email: Joi.email().required(),
    userName: Joi.string().required(),
    phone: Joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/)),
    age: Joi.number().min(10).max(100).integer().positive(), 
}).required()

