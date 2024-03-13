import Joi from 'joi';

export const messageSchema = Joi.object({
  description: Joi.string().min(5).required(),
  email:Joi.string().email().required(),
  name:Joi.string().min(4).required()
});