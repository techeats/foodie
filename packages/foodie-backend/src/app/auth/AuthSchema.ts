import Joi from '@hapi/joi';

export const LoginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .trim()
    .required()
  ,
  password: Joi.string().trim().required(),
});
