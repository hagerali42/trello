import Joi from "joi";


export const addTask =Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  deadline: Joi.date().min('now').required(),
  assignTo: Joi.string().required(),

}).required()

export const updateTask =Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    
    taskId: Joi.string().required(),
  
  }).required()

  export const deleteTask =Joi.object({
   taskId: Joi.string().required(),
  }).required()

