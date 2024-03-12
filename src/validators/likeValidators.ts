import Joi from 'joi';

export const likeSchema = Joi.object({
  like: Joi.boolean(),
  blogId: Joi.string(),
});