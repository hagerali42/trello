import Joi from "joi";


export const signup =Joi.object({
    userName:  Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2,maxDomainSegments: 3, }).required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)),
    cPassword: Joi.string().valid(Joi.ref("password")).required(),
    phone: Joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/)),
    gender: Joi.string().required(),
    age: Joi.number().min(10).max(100).integer().positive(),  
    isAdmin:Joi.boolean()  
}).required()

export const login =Joi.object({
    email: Joi.string().email({ minDomainSegments: 2,maxDomainSegments: 3, }).required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)),
}).required()

export const confirmEmail =Joi.object({
    token: Joi.string().required()
}).required()

export const newconfirmEmail =Joi.object({
    token: Joi.string().required()
}).required()

export const forgetPassword =Joi.object({
    email: Joi.string().email({ minDomainSegments: 2,maxDomainSegments: 3, }).required(),
}).required()

export const resetpassword =Joi.object({
    email: Joi.string().email({ minDomainSegments: 2,maxDomainSegments: 3, }).required(),
    newPassword: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    verificationCode:Joi.number().required(),
}).required()