import Joi from '@hapi/joi';

export const LoginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .trim()
    .required()
  ,
  password: Joi.string().trim().required(),
  // TODO use a more specific error messgae for a type failure
  type: Joi.string().valid(['user', 'vendor']),
});
